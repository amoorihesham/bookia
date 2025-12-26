'use server';
import { handleError } from '@/shared/lib/error-handling';
import { getCurrentUser } from '@/shared/lib/auth';
import plansRepository from '../db/plans.repo';
import { stripe } from '@/services/stripe';
import { env } from '@/data/env/server';
import { ActionResult } from '@/types/action-result';
import { PlanNameType, PlanType } from '../types';
import { GeneralErrorsMessages } from '@/shared/utils/messages';
import { PlansErrorsMessages, PlansMessages } from '../helpers/messages';
import { updateTag } from 'next/cache';
import { isAdmin } from '../helpers/validation';
import { CreateNewPlanInput, createPlanSchema } from '../schemas';

export const createPlanAction = async (plan: CreateNewPlanInput): Promise<ActionResult<PlanType>> => {
  try {
    const vdata = createPlanSchema.parse(plan);

    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const [existingPlan] = await plansRepository.findPlanByName(vdata.name as PlanNameType);
    if (existingPlan) throw Error(PlansErrorsMessages.alreadyExists(vdata.name));

    const [newPlan] = await plansRepository.createPlan(vdata);
    updateTag('plans');

    return { success: true, message: PlansMessages.created(newPlan.name), data: newPlan };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const upgradePlane = async (planName: PlanNameType) => {
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

export const deletePlanAction = async (planName: PlanNameType): Promise<ActionResult<PlanType>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const [plan] = await plansRepository.findPlanByName(planName);
    if (!plan) throw Error(PlansErrorsMessages.notFound);

    await plansRepository.deletePlan(plan.id);
    updateTag('plans');

    return { success: true, message: PlansMessages.deleted(plan.name) };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
