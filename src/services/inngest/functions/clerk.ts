import { env } from '@/data/env/server';
import { Webhook } from 'svix';
import { inngest } from '../client';
import { NonRetriableError } from 'inngest';

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

    const userId = await step.run('create-user', async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find((email) => email.id === userData.primary_email_address_id);

      if (!email) throw new NonRetriableError('No primary email address found.');

      return userData.id;
    });
  }
);
