'use server';
import { handleError } from '@/lib/error-handling';
import { getCurrentUser } from '@/shared/lib/auth';
import plansRepository from '../db/plans.repo';
import { PLANS } from '@/drizzle/schema';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import { stripe } from '@/services/stripe';

export const upgradePlane = async (planName: (typeof PLANS.enumValues)[number]) => {
  try {
    // get the current user
    const user = await getCurrentUser();
    if (!user) throw Error('No user found.');
    // get plan by name
    const [wantedPlan] = await plansRepository.findPlanByName(planName);
    // check if current user plan === the wanted plan
    if (user.plan_id === wantedPlan.id) throw Error('You already subscribed to this plan.');
    const [subscription] = await subscriptionsRepository.findUserSubscription(user.clerk_id);
    let customerId = subscription.stripe_customer_id;
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.clerk_id,
        },
      });

      customerId = stripeCustomer.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customerId,
      line_items: [
        {
          price: wantedPlan.stripe_price_id!,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return { success: true, url: session.url };
    // if user on free plan create stripe customer
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};
