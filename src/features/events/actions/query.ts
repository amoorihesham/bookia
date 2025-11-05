// import { cacheLife, cacheTag } from 'next/cache';
import eventsRepository from '../db/events.repo';

export const GetAllEventsAction = async () => {
  // 'use cache';
  // cacheLife('seconds');
  // cacheTag('events');

  return eventsRepository.findAllEvents();
};
