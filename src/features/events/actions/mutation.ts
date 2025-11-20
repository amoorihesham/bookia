'use server';
import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import { revalidatePath, updateTag } from 'next/cache';
import { createNewEventFormInput, createNewEventFormOutput, createNewEventSchema } from '../schemas';
import { handleError } from '@/lib/error-handling';
import { EventTable } from '@/drizzle/schema';

type BookEventSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

type BookEventError = {
  success: false;
  message: string;
  errors: string[];
};

export type BookEventResult = BookEventSuccess<typeof EventTable.$inferSelect> | BookEventError;

export const toggleEventFeaturedStatus = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'No user found.' };

  const [subscription] = await subscriptionsRepository.findUserSubscription(user.clerk_id);
  if (!subscription) return { success: false, message: 'Subscription not found.' };
  if (subscription.remaining_featured_events === 0) return { success: false, message: 'Upgrade your plan.' };

  const [event] = await eventsRepository.findEventById(eventId);
  if (!event) return { success: false, message: 'Event not found.' };

  if (user.role !== 'admin' && event.user_id !== user.clerk_id) return { success: false, message: 'Access denied.' };

  const [res] = await eventsRepository.updateEvent(eventId, {
    featured: !event.featured,
    updatedAt: new Date(),
  });
  await subscriptionsRepository.updateSubscription(subscription.id, {
    remaining_featured_events: subscription.remaining_featured_events - 1,
    updatedAt: new Date(),
  });

  revalidatePath('/', 'page');
  updateTag('events');
  return { success: true, message: `${res.name} is now ${res.featured ? 'Featured' : 'Normal'}` };
};

export const createNewEventAction = async (payload: createNewEventFormOutput) => {
  try {
    const vData = createNewEventSchema.parse(payload);
    const user = await getCurrentUser();
    if (!user) throw Error('No user found');
    const guests = vData.guests.split(',');
    const evt = await eventsRepository.insertNewEvent({
      ...vData,
      guests,
      user_id: user.clerk_id,
      cover_thumbnail: 'hha',
    });
    revalidatePath('/', 'page');
    updateTag('events');
    console.log('CREATED_EVENT', evt);
    return { success: true, message: 'Event created successfully', data: evt[0] };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};

export const bookEventTicket = async (eventId: string): Promise<BookEventResult> => {
  try {
    const user = await getCurrentUser();
    console.log(user);
    if (!user) throw Error('No user found');

    revalidatePath('/', 'page');
    updateTag('all-events');
    const e = await eventsRepository.findEventById(eventId);
    return { success: true, message: 'Event booked successfully', data: e[0] };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error) as BookEventError;
  }
};
