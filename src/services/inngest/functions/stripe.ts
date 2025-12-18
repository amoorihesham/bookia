import plansRepository from '@/features/plans/db/plans.repo';
import { inngest } from '../client';
import { PLANS } from '@/drizzle/schema';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import userRepository from '@/features/users/db/user.repo';
import { GetEventByIdAction } from '@/features/events/actions/query';
import { updateEventTicketsCountAction } from '@/features/events/actions/mutation';
import { insertNewBookingRecordAction } from '@/features/bookings/actions/mutations';

export const stripeUserSubscription = inngest.createFunction(
  { id: 'stripe/Subscription-completed', name: 'Stripe - Update User Subscription' },
  { event: 'stripe/user.subscription' },
  async ({ event, step }) => {
    try {
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
    } catch (error) {
      console.log('ERROR in InggestStripe - Update User Subscription', error);
      throw error;
    }
  }
);

export const stripeUserBookedEvent = inngest.createFunction(
  { id: 'stripe/Event-booked', name: 'Stripe - Update User Booked Events' },
  { event: 'stripe/event.booked' },
  async ({ event, step }) => {
    try {
      const sEvent = event.data.data;

      const evt = await step.run('find event.', async () => {
        const [event] = await GetEventByIdAction(sEvent.metadata.eventId!);
        if (!event) throw new Error('Event not found STEP_ONE');
        return event;
      });

      const updatedEvent = await step.run('update event tickets count.', async () => {
        const [uevt] = await updateEventTicketsCountAction(
          sEvent.metadata.eventId!,
          evt.tickets - sEvent.metadata.tickets!
        );
        if (!uevt) throw new Error('Event not found');
        return uevt;
      });

      const booking = await step.run('create booking record', async () => {
        const [bk] = await insertNewBookingRecordAction({
          user_id: sEvent.metadata.userId!,
          event_id: updatedEvent.id,
        });
        return bk;
      });

      return { updatedEvent, booking };
    } catch (error) {
      console.log('ERROR in InggestStripe - Create User Booking', error);
      throw error;
    }
  }
);
