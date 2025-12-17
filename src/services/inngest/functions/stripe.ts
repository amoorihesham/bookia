import plansRepository from '@/features/plans/db/plans.repo';
import { inngest } from '../client';
import { PLANS } from '@/drizzle/schema';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import userRepository from '@/features/users/db/user.repo';

export const stripeCheckoutSessionCompleted = inngest.createFunction(
  { id: 'stripe/update-db-after-checkout-completed', name: 'Stripe - Update User Subscription' },
  { event: 'stripe/user.subscription' },
  async ({ event, step }) => {
    const sEvent = event.data.data;
    const plan = await step.run('Find user upgraded plan', async () => {
      const planName = sEvent.metadata?.planName as (typeof PLANS.enumValues)[number];
      const [plan] = await plansRepository.findPlanByName(planName);
      if (!plan) throw new Error('Plan not found');
      return plan;
    });

    const subscription = await step.run('Create subscription record', async () => {
      const userId = sEvent.metadata?.userId;
      const [subscription] = await subscriptionsRepository.insertNewSubscription({
        plan_id: plan.id,
        user_id: userId!,
        subscribed_on: new Date(),
        is_active: true,
      });
      return subscription;
    });
    const user = await step.run('Update user plan_id', async () => {
      const [user] = await userRepository.updateUser(subscription.user_id, {
        plan_id: plan.id,
      });
      return user;
    });
    return { subscription, user, plan };
  }
);
