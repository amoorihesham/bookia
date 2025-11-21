import { inngest } from '../client';
import { verifyWebhook } from '../lib';
import userRepository from '@/features/users/db/user.repo';
import { createUsername } from '@/services/clerk/lib';
import { getUserPrimaryEmail } from '@/shared/lib/auth';
import plansRepository from '@/features/plans/db/plans.repo';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';

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

      const plan = await step.run('get-free-plan', async () => {
        const [freePlan] = await plansRepository.findPlanByName('free');
        if (!freePlan) throw Error('Free plan not found');
        return freePlan;
      });

      const user = await step.run('create-user', async () => {
        const payload = event.data.data;

        const primaryEmail = getUserPrimaryEmail(payload);
        if (!primaryEmail) throw Error('Primary email not found');

        const [user] = await userRepository.insertNewUser({
          clerk_id: payload.id,
          email: primaryEmail,
          image: payload.image_url,
          method: payload.external_accounts[0]?.provider || 'unknown',
          username: createUsername(payload),
          plan_id: plan.id,
        });
        return user;
      });

      const subscription = await step.run('create-subscription', async () => {
        const [subscription] = await subscriptionsRepository.insertNewSubscription({
          user_id: user.clerk_id,
          plan_id: plan.id,
          subscribed_on: new Date(),
          is_active: true,
        });

        return { user, subscription };
      });

      return { user, plan, subscription };
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
        const deletedUserId = event.data.data.id;
        await userRepository.deleteUser(deletedUserId!);
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error; // Re-throw to let Inngest handle the failure
    }
  }
);
