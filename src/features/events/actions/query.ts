import { cacheTag } from 'next/cache';
import eventsRepository from '../db/events.repo';

export const GetEventsAction = async (term: 'all' | 'featured' | 'today' | 'expired' = 'all') => {
  switch (term) {
    case 'all':
      cacheTag(`${term}-events`);
      return eventsRepository.findAllEvents();
    case 'today':
      cacheTag(`${term}-events`);
      return eventsRepository.findAllTodayEvents();
    case 'expired':
      cacheTag(`${term}-events`);
      return eventsRepository.findAllExpiredEvents();
    case 'featured':
      cacheTag(`${term}-events`);
      return eventsRepository.findAllFeaturedEvents();
    default:
      cacheTag(`${term}-events`);
      return eventsRepository.findAllEvents();
  }
};
