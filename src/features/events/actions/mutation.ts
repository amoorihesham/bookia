'use server';

import { getCurrentUser } from '@/shared/lib/auth';
import { handleError } from '@/shared/lib/error-handling';
import { uploadToCloudinary } from '@/services/cloudinary/functions';
import { createStripeCheckoutSessionForEvent } from '@/services/stripe';
import { ConstructLocalDate, ConvertFromLocalToIso, ExtractHoursAndMinuts } from '@/shared/utils/date';
import { updateAllPagesCacheTag, UpdateUserEventsAndStatsCacheTag } from '@/shared/utils/cache';
import { GeneralErrorsMessages } from '@/shared/utils/messages';
import { ActionResult } from '@/types/action-result';
import eventsRepository from '../db/events.repo';
import { createNewEventFormInput, createNewEventSchema } from '../schemas';
import { EventsErrorsMessages, EventsMessages } from '../helpers/messages';
import { CheckPermission, isEventTimePassed } from '../helpers/validation';
import { EventType } from '../types';

export const createNewEventAction = async (payload: createNewEventFormInput): Promise<ActionResult<EventType>> => {
  try {
    const vData = createNewEventSchema.parse(payload);
    const timeArray = ExtractHoursAndMinuts(vData.time_on);
    const localDate = ConstructLocalDate(vData.held_on, timeArray);
    const isoDate = ConvertFromLocalToIso(localDate);

    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);

    const image = await uploadToCloudinary(vData.cover_thumbnail[0]);

    const guests = vData.guests.split(',');

    const [evt] = await eventsRepository.insertNewEvent({
      ...vData,
      held_on: new Date(isoDate),
      guests,
      user_id: user.clerk_id,
      cover_thumbnail: image.secure_url,
    });

    updateAllPagesCacheTag();
    UpdateUserEventsAndStatsCacheTag(user.clerk_id);

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

export const bookEventTicket = async (eventId: string): Promise<ActionResult<{ checkout_url: string }>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventsErrorsMessages.notFound);
    if (!evt.open) throw Error(EventsErrorsMessages.notOpen);

    const cUrl = await createStripeCheckoutSessionForEvent({
      eventId: evt.id,
      tickets: 1,
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

export const toggleEventFeaturedStatus = async (eventId: string): Promise<ActionResult<EventType>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventsErrorsMessages.notFound);
    if (!evt.open) throw Error(EventsErrorsMessages.cannotFeatureClosed);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(GeneralErrorsMessages.unauthorized);

    const [uEvt] = await eventsRepository.updateEvent(eventId, { featured: !evt.featured });
    updateAllPagesCacheTag();
    UpdateUserEventsAndStatsCacheTag(user.clerk_id);

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

export const toggleEventOpenStatusAction = async (eventId: string): Promise<ActionResult<EventType>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventsErrorsMessages.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(GeneralErrorsMessages.unauthorized);

    if (!evt.open) {
      if (isEventTimePassed(evt)) throw Error(EventsErrorsMessages.cannotToggleExpired('open'));
    }

    const [newEvent] = await eventsRepository.updateEvent(eventId, { open: !evt.open });
    updateAllPagesCacheTag();
    UpdateUserEventsAndStatsCacheTag(user.clerk_id);

    return {
      success: true,
      message: EventsMessages.opened(newEvent.name, newEvent.open!),
      data: newEvent,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteEventAction = async (eventId: string): Promise<ActionResult<null>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);

    const [evt] = await eventsRepository.findEventById(eventId);
    if (!evt) throw Error(EventsErrorsMessages.notFound);

    const hasPermission = CheckPermission(evt, user);
    if (!hasPermission) throw Error(GeneralErrorsMessages.unauthorized);

    await eventsRepository.deleteEvent(eventId);
    updateAllPagesCacheTag();
    UpdateUserEventsAndStatsCacheTag(user.clerk_id);

    return { success: true, message: EventsMessages.deleted(evt.name), data: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
