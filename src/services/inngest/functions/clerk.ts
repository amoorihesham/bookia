import { env } from '@/data/env/server';
import { Webhook } from 'svix';
import { inngest } from '../client';
import { NonRetriableError } from 'inngest';
import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

function verifyWebhook({ raw, headers }: { raw: string; headers: Record<string, string> }) {
  return new Webhook(env.CLERK_SECRET_WEBHOOK_KEY).verify(raw, headers);
}

export const clerkCreatedUser = inngest.createFunction(
  {
    id: 'clerk/create-db-user',
    name: 'Clerk = Create Database User',
  },
  {
    event: 'clerk/user.created',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', async () => {
      try {
        verifyWebhook(event.data);
      } catch {
        throw new NonRetriableError('Invalid webhook');
      }
    });

    await step.run('create-user', async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id
      )?.email_address;

      if (!email) throw new NonRetriableError('No primary email address found.');

      await db.insert(UserTable).values({
        id: userData.id,
        username: userData.username || [userData.first_name, userData.last_name].join(' '),
        email,
        method: userData.external_accounts[0].provider,
        image: userData.image_url || userData.external_accounts[0].image_url,
      });
    });
  }
);

export const clerkDeletedUser = inngest.createFunction(
  {
    id: 'clerk/delete-db-user',
    name: 'Clerk = Delete Database User',
  },
  {
    event: 'clerk/user.deleted',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', async () => {
      try {
        verifyWebhook(event.data);
      } catch (error) {
        throw new NonRetriableError('Invalid webhook');
      }
    });

    const userId = await step.run('delete-user', async () => {
      const userData = event.data.data;

      await db.delete(UserTable).where(eq(UserTable.id, userData.id!));

      return userData.id;
    });
  }
);

export const clerkUpdatedUser = inngest.createFunction(
  {
    id: 'clerk/update-db-user',
    name: 'Clerk = Update Database User',
  },
  {
    event: 'clerk/user.updated',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', async () => {
      try {
        verifyWebhook(event.data);
      } catch (error) {
        throw new NonRetriableError('Invalid webhook');
      }
    });

    const userId = await step.run('update-user', async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find((email) => email.id === userData.primary_email_address_id);

      if (!email) throw new NonRetriableError('No primary email address found.');

      await db
        .update(UserTable)
        .set({
          email: email.email_address,
          image: userData.image_url,
          method: 'google',
          username: `${String(userData.first_name) + String(userData.last_name) || userData.username}`,
          updatedAt: new Date(),
        })
        .where(eq(UserTable.id, userData.id));

      return userData.id;
    });
  }
);
