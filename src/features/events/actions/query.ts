import { cacheLife, cacheTag } from 'next/cache';
import eventsRepository from '../db/events.repo';

export const GetAllEventsAction = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag('all-events');
  return eventsRepository.findAllEvents();
};
