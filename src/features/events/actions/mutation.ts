'use server';
import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import { revalidatePath, updateTag } from 'next/cache';
import {
  createNewEventFormInput,
  createNewEventFormOutput,
  createNewEventSchema,
} from '../schemas';
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

export type BookEventResult =
  | BookEventSuccess<typeof EventTable.$inferSelect>
  | BookEventError;

export const createNewEventAction = async (
  payload: createNewEventFormInput
) => {
  try {
    const vData = createNewEventSchema.parse(payload);
    console.log(vData, 'DATA_AFTER_VALIDATION');
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
    return {
      success: true,
      message: 'Event created successfully',
      data: evt[0],
    };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};

export const bookEventTicket = async (
  eventId: string
): Promise<BookEventResult> => {
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
