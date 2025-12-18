'use server';
import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import { revalidatePath, updateTag } from 'next/cache';
import { createNewEventFormInput, createNewEventSchema } from '../schemas';
import { handleError } from '@/lib/error-handling';
import { uploadToCloudinary } from '@/services/cloudinary/functions';
import { createStripeCheckoutSessionForEvent } from '@/services/stripe';
import { ConstructLocalDate, ConvertFromLocalToIso, ExtractHoursAndMinuts } from '@/shared/utils/date';

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

export type BookEventResult = BookEventSuccess<{ ceckout_url: string }> | BookEventError;

export const createNewEventAction = async (payload: createNewEventFormInput) => {
  try {
    const vData = createNewEventSchema.parse(payload);
    const timeArray = ExtractHoursAndMinuts(vData.time_on);
    const localDate = ConstructLocalDate(vData.held_on, timeArray);
    const isoDate = ConvertFromLocalToIso(localDate);

    const user = await getCurrentUser();
    if (!user) throw Error('No user found');

    const image = await uploadToCloudinary(vData.cover_thumbnail[0], {
      folder: 'bookia/events_thumbnails',
      resource_type: 'image',
      format: 'webp',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    });

    const guests = vData.guests.split(',');

    const [evt] = await eventsRepository.insertNewEvent({
      ...vData,
      held_on: new Date(isoDate),
      guests,
      user_id: user.clerk_id,
      cover_thumbnail: image.secure_url,
    });
    revalidatePath('/', 'page');
    updateTag('events');

    return {
      success: true,
      message: `Event Named " ${evt.name} " successfully created.`,
      data: evt,
    };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};

// export const updateEventAction = async (eventId: string, payload: Partial<createNewEventFormInput>) => {
//   try {
//     const user = await getCurrentUser();
//     if (!user) throw Error('No user found');
//     const [evt] = await eventsRepository.findEventById(eventId);
//     if (!evt) throw Error('Event not found');

//     let image;
//     if (payload.cover_thumbnail) {
//       image = await uploadToCloudinary(payload.cover_thumbnail[0], {
//         folder: 'bookia/events_thumbnails',
//         resource_type: 'image',
//         format: 'webp',
//         allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//       });
//     }

//     const guests = payload.guests ? payload.guests.split(',') : evt!.guests;
//     const heldOn = new Date(payload.held_on ?? evt.held_on);
//     const [hours, minutes] = payload.time_on
//       ? payload.time_on.split(':').map(Number)
//       : [heldOn.getHours(), heldOn.getMinutes()];
//     heldOn.setHours(hours, minutes);

//     const { time_on, ...eventData } = payload;

//     const [uEvt] = await eventsRepository.updateEvent(eventId, {
//       ...eventData,
//       held_on: heldOn,
//       guests,
//       user_id: user.clerk_id,
//       cover_thumbnail: image.secure_url,
//       tickets: payload.tickets ?? evt.tickets,
//       tickets: payload.tickets ?? evt.tickets,
//     });
//     revalidatePath('/', 'page');
//     updateTag('events');

//     return {
//       success: true,
//       message: 'Event created successfully',
//       data: evt[0],
//     };
//   } catch (error: unknown) {
//     console.log(error);
//     return handleError(error);
//   }
// };

export const bookEventTicket = async (eventId: string, ticketCount: number): Promise<BookEventResult> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error('No user found');

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error('No event found.');

    const cUrl = await createStripeCheckoutSessionForEvent({
      eventId: evt.id,
      tickets: ticketCount,
      price: evt.ticket_price,
      name: evt.name,
      thumbnail: evt.cover_thumbnail,
      userId: user.clerk_id,
    });

    return { success: true, message: 'Event booked successfully', data: { ceckout_url: cUrl! } };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error) as BookEventError;
  }
};

export const toggleEventFeaturedStatus = async (eventId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error('No user found');

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error('Event not found');

    const [uEvt] = await eventsRepository.updateEvent(eventId, { featured: !evt.featured });
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: `Event with id [${uEvt.id}] is now ${uEvt.featured ? 'featured' : 'normal'}`,
      data: uEvt,
    };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const deleteEventAction = async (eventId: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error('No user found');

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error('Event not found');

    if (user.clerk_id !== evt.user_id || user.role !== 'admin')
      throw Error('You are not authorized to delete this event');

    await eventsRepository.deleteEvent(eventId);
    revalidatePath('/', 'layout');

    return { success: true, message: `Event with id [${eventId}] deleted successfully`, data: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const updateEventTicketsCountAction = async (eventId: string, newTicketsCount: number) => {
  return eventsRepository.updateEvent(eventId, { tickets: newTicketsCount });
};

export const toggleEventOpenStatusAction = async (eventId: string, newOpenStatus: boolean) => {
  try {
    const [newEvent] = await eventsRepository.updateEvent(eventId, { open: newOpenStatus });
    revalidatePath('/', 'layout');
    return {
      success: true,
      message: `Event with name [${newEvent.name}] is now ${newEvent.open ? 'open' : 'closed'}`,
      data: newEvent,
    };
  } catch (error) {
    return handleError(error);
  }
};
