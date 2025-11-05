import { inngest } from '../client';
import { verifyWebhook } from '../lib';
import userRepository from '@/features/users/db/user.repo';
import { addOneMonth, getRemainingDays } from '@/shared/lib/subscriptions-dates';
import { db } from '@/drizzle/db';
import { PlanTable, SubscriptionTable, UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { createUsername } from '@/services/clerk/lib';
import { getUserPrimaryEmail } from '@/shared/lib/auth';

export const clerkCreatedUser = inngest.createFunction(
  {
    id: 'clerk/create-db-user',
    name: 'Clerk - Create Database User',
  },
  {
    event: 'clerk/user.created',
  },
  async ({ event, step }) => {
    try {
      await step.run('verify-webhook', () => verifyWebhook(event.data));

      return await step.run('create-user', async () => {
        const payload = event.data.data;

        const primaryEmail = getUserPrimaryEmail(payload);
        if (!primaryEmail) throw new Error('Primary email not found');

        // 2. Get free plan
        const freePlan = await db.query.PlanTable.findFirst({
          where: eq(PlanTable.name, 'free'),
        });

        if (!freePlan) {
          throw new Error('Free plan not found');
        }

        // 1. Create user
        const [user] = await db
          .insert(UserTable)
          .values({
            clerk_id: payload.id,
            email: primaryEmail,
            image: payload.image_url,
            method: payload.external_accounts[0]?.provider || 'unknown',
            username: createUsername(payload),
            plan_id: freePlan.id,
          })
          .returning();

        // 3. Create subscription
        const activated_at = new Date();
        const renew_at = addOneMonth(activated_at);

        const [subscription] = await db
          .insert(SubscriptionTable)
          .values({
            user_id: user.clerk_id,
            plan_id: freePlan.id,
            activated_at: activated_at.toISOString(),
            renew_at: renew_at.toISOString(),
            remaining_days: getRemainingDays(renew_at),
            max_featured_events: freePlan.max_featured_count,
            remaining_featured_events: freePlan.max_featured_count,
            is_active: true,
          })
          .returning();

        return { user, subscription: { plan_id: freePlan.id } };
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error; // Re-throw to let Inngest handle the failure
    }
  }
);

export const clerkDeletedUser = inngest.createFunction(
  {
    id: 'clerk/delete-db-user',
    name: 'Clerk - Delete Database User',
  },
  {
    event: 'clerk/user.deleted',
  },
  async ({ event, step }) => {
    try {
      await step.run('verify-webhook', () => verifyWebhook(event.data));

      return await step.run('delete-user', async () => {
        const payload = event.data.data;

        await userRepository.deleteUser(payload.id!);
        await db.delete(SubscriptionTable).where(eq(SubscriptionTable.user_id, payload.id as string));
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error; // Re-throw to let Inngest handle the failure
    }
  }
);
