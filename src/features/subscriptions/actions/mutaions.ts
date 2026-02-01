'use server';

import { SubscriptionsErrorsMessages, SubscriptionsMessages } from '@/features/subscriptions/helpers/messages';
import { getCurrentUser } from '@/shared/lib/auth';
import { isAdmin } from '@/shared/lib/checks';
import { handleError } from '@/shared/lib/error-handling';
import { GeneralErrorsMessages } from '@/shared/utils/messages';
import subscriptionsRepository from '../db/subscriptions-repo';
import { updateTag } from 'next/cache';
import { ActionResult } from '@/types/action-result';
import { SubscriptionType } from '../types';
import { updateSubscriptionSchema, updateSubscriptionType } from '../schemas';

export const deleteSubscriptionAction = async (subscriptionId: string) => {};

export const toggleSubscriptionStatusAction = async (subscriptionId: string): Promise<ActionResult<string>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const subscription = await subscriptionsRepository.findSubscriptionById(subscriptionId);
    if (!subscription) throw Error(SubscriptionsErrorsMessages.notFound);

    const uSub = await subscriptionsRepository.updateSubscription(subscription.id, {
      is_active: !subscription.is_active,
    });
    console.log(uSub, 'Updated_Subscription');

    updateTag('admin-subscriptions-page');

    return {
      success: true,
      message: SubscriptionsMessages.toggled(subscription.id, !subscription.is_active),
      data: subscription.id,
    };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const updateSubscriptionAction = async (
  subscriptionId: string,
  payload: updateSubscriptionType
): Promise<ActionResult<SubscriptionType>> => {
  try {
    const vData = updateSubscriptionSchema.parse(payload);

    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const subscription = await subscriptionsRepository.findSubscriptionById(subscriptionId);
    if (!subscription) throw Error(SubscriptionsErrorsMessages.notFound);

    const [uSub] = await subscriptionsRepository.updateSubscription(subscription.id, {
      is_active: vData.is_active,
      plan_id: vData.planId,
    });

    updateTag('admin-subscriptions-page');

    return {
      success: true,
      message: SubscriptionsMessages.updated(subscription.id),
      data: uSub,
    };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
