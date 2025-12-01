'use server';
import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import { revalidatePath, revalidateTag, updateTag } from 'next/cache';
import { createNewEventFormInput, createNewEventFormOutput, createNewEventSchema } from '../schemas';
import { handleError } from '@/lib/error-handling';
import { EventTable } from '@/drizzle/schema';
import { pathToFileURL } from 'url';
import { uploadToCloudinary } from '@/services/cloudinary/functions';

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

export const createNewEventAction = async (payload: createNewEventFormInput) => {
  try {
    const vData = createNewEventSchema.parse(payload);
    const user = await getCurrentUser();
    if (!user) throw Error('No user found');

    const image = await uploadToCloudinary(vData.cover_thumbnail[0], {
      folder: 'bookia/events_thumbnails',
      resource_type: 'image',
      format: 'webp',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    });
    console.log(image, 'UPLOADED_IMAGE');

    const guests = vData.guests.split(',');
    const [hours, minutes] = vData.time_on.split(':').map(Number);
    const heldOn = new Date(vData.held_on);
    heldOn.setHours(hours, minutes);

    const { time_on, ...eventData } = vData;

    const evt = await eventsRepository.insertNewEvent({
      ...eventData,
      held_on: heldOn,
      guests,
      user_id: user.clerk_id,
      cover_thumbnail: image.secure_url,
    });
    revalidatePath('/', 'page');
    updateTag('events');

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

export const bookEventTicket = async (eventId: string): Promise<BookEventResult> => {
  try {
    const user = await getCurrentUser();
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

export const toggleEventFeaturedStatus = async (eventId: string, term: string) => {
  try {
    const user = await getCurrentUser()
    if (!user) throw Error('No user found');
    const [evt] = await eventsRepository.findEventById(eventId)
    if (!evt) throw Error('Event not found')
    const [uEvt] = await eventsRepository.updateEvent(eventId, { featured: !evt.featured })
    revalidateTag(`${term}-events`, 'minutes')
    revalidatePath('/', 'layout')
    return { success: true, message: `Event with id [${uEvt.id}] is now ${uEvt.featured ? 'featured' : 'normal'}`, data: uEvt }
  }
  catch (error) {
    console.log(error);
    return handleError(error)

  }
}

export const deleteEventAction = async (eventId: string) => {
  try {
    const user = await getCurrentUser()
    if (!user) throw Error('No user found');
    const [evt] = await eventsRepository.findEventById(eventId)
    if (!evt) throw Error('Event not found')
    if (user.clerk_id !== evt.user_id) throw Error('You are not authorized to delete this event')
    await eventsRepository.deleteEvent(eventId)
    revalidatePath('/', 'layout')
    return { success: true, message: `Event with id [${eventId}] deleted successfully`, data: null }
  }
  catch (error) {
    console.log(error);
    return handleError(error)

  }
}