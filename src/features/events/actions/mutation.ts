'use server';

import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import { createNewEventFormInput, createNewEventSchema } from '../schemas';
import { handleError } from '@/lib/error-handling';
import { uploadToCloudinary } from '@/services/cloudinary/functions';
import { createStripeCheckoutSessionForEvent } from '@/services/stripe';
import { ConstructLocalDate, ConvertFromLocalToIso, ExtractHoursAndMinuts } from '@/shared/utils/date';
import { ActionResult } from '@/types/action-result';
import { EventTable } from '@/drizzle/schema';
import { EventErrors, EventsMessages } from '../helpers/messages';
import { RevalidateAllPagesCache, UpdateUserEventsAndStatsCache } from '../helpers/cache';
import { CheckPermission } from '../helpers/validation';

export const createNewEventAction = async (
  payload: createNewEventFormInput
): Promise<ActionResult<typeof EventTable.$inferSelect>> => {
  try {
    const vData = createNewEventSchema.parse(payload);
    const timeArray = ExtractHoursAndMinuts(vData.time_on);
    const localDate = ConstructLocalDate(vData.held_on, timeArray);
    const isoDate = ConvertFromLocalToIso(localDate);

    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const image = await uploadToCloudinary(vData.cover_thumbnail[0]);

    const guests = vData.guests.split(',');

    const [evt] = await eventsRepository.insertNewEvent({
      ...vData,
      held_on: new Date(isoDate),
      guests,
      user_id: user.clerk_id,
      cover_thumbnail: image.secure_url,
    });
    RevalidateAllPagesCache();
    UpdateUserEventsAndStatsCache(user.clerk_id);

    return {
      success: true,
      message: EventsMessages.created(evt.name),
      data: evt,
    };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};

export const bookEventTicket = async (
  eventId: string,
  ticketCount: number
): Promise<ActionResult<{ checkout_url: string }>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventErrors.notFound);

    if (!evt.open) throw Error(EventErrors.notOpen);

    const cUrl = await createStripeCheckoutSessionForEvent({
      eventId: evt.id,
      tickets: ticketCount,
      price: evt.ticket_price,
      name: evt.name,
      thumbnail: evt.cover_thumbnail,
      userId: user.clerk_id,
    });

    return { success: true, message: EventsMessages.booked(), data: { checkout_url: cUrl! } };
  } catch (error: unknown) {
    console.log(error);
    return handleError(error);
  }
};

export const toggleEventFeaturedStatus = async (
  eventId: string
): Promise<ActionResult<typeof EventTable.$inferSelect>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventErrors.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(EventErrors.unauthorized);

    const [uEvt] = await eventsRepository.updateEvent(eventId, { featured: !evt.featured });
    RevalidateAllPagesCache();
    UpdateUserEventsAndStatsCache(user.clerk_id);
    return {
      success: true,
      message: EventsMessages.featured(uEvt.name, uEvt.featured!),
      data: uEvt,
    };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const deleteEventAction = async (eventId: string): Promise<ActionResult<null>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventErrors.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(EventErrors.unauthorized);

    await eventsRepository.deleteEvent(eventId);
    RevalidateAllPagesCache();
    UpdateUserEventsAndStatsCache(user.clerk_id);

    return { success: true, message: EventsMessages.deleted(evt.name), data: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const updateEventTicketsCountAction = async (
  eventId: string,
  newTicketsCount: number
): Promise<ActionResult<typeof EventTable.$inferSelect>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventErrors.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(EventErrors.unauthorized);

    const [updatedEvent] = await eventsRepository.updateEvent(eventId, { tickets: newTicketsCount });
    RevalidateAllPagesCache();
    UpdateUserEventsAndStatsCache(user.clerk_id);

    return {
      success: true,
      message: `Event with name [${updatedEvent.name}] tickets count updated successfully`,
      data: updatedEvent,
    };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const toggleEventOpenStatusAction = async (
  eventId: string,
  newOpenStatus: boolean
): Promise<ActionResult<typeof EventTable.$inferSelect>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(EventErrors.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventErrors.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(EventErrors.unauthorized);

    const [newEvent] = await eventsRepository.updateEvent(eventId, { open: newOpenStatus });
    RevalidateAllPagesCache();
    UpdateUserEventsAndStatsCache(user.clerk_id);

    return {
      success: true,
      message: EventsMessages.opened(newEvent.name, newEvent.open!),
      data: newEvent,
    };
  } catch (error) {
    return handleError(error);
  }
};
