'use server';
import { handleError } from '@/lib/error-handling';
import { getCurrentUser } from '@/shared/lib/auth';
import plansRepository from '../db/plans.repo';
import { PLANS } from '@/drizzle/schema';
import { stripe } from '@/services/stripe';
import { env } from '@/data/env/server';

export const upgradePlane = async (planName: (typeof PLANS.enumValues)[number]) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error('No user found.');

    const [wantedPlan] = await plansRepository.findPlanByName(planName);
    if (!wantedPlan) throw Error('Plan not found.');

    if (user.plan_id === wantedPlan.id) throw Error('You already subscribed to this plan.');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price: wantedPlan.stripe_price_id!,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.clerk_id,
        planName: wantedPlan.name,
      },
      success_url: `${env.BASE_URL}/success`,
      cancel_url: `${env.BASE_URL}/cancel`,
    });

    return { success: true, url: session.url };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};
