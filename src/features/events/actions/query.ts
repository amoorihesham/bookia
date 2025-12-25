import { cacheLife, cacheTag } from 'next/cache';
import eventsRepository from '../db/events.repo';
import { FindEventsFilterTerm } from '../types';
import { UserTable } from '@/drizzle/schema';
import { SetUserEventsAndStatsCache } from '../helpers/cache';

export const GetEventsAction = async (term: FindEventsFilterTerm = 'all') => {
  return eventsRepository.findAllEvents(term);
};

export const GetUserEventStatsAction = async (user: typeof UserTable.$inferSelect) => {
  'use cache';
  cacheLife('hours');
  SetUserEventsAndStatsCache(user.clerk_id);
  if (!user)
    return {
      count: 0,
      featured_count: 0,
      open_count: 0,
      close_count: 0,
    };

  let featured_count = 0;
  let open_count = 0;
  let close_count = 0;

  const result = await eventsRepository.findUserEvents(user.clerk_id);

  for (const e of result) {
    if (e.featured) featured_count += 1;
    if (e.open) open_count += 1;
    if (!e.open) close_count += 1;
  }

  return {
    count: result.length,
    featured_count,
    open_count,
    close_count,
  };
};
export const GetUserEventsAction = async (user: typeof UserTable.$inferSelect) => {
  'use cache';
  cacheLife('hours');
  SetUserEventsAndStatsCache(user.clerk_id);

  return eventsRepository.findUserEvents(user.clerk_id);
};

export const GetEventByIdAction = async (eventId: string) => {
  return eventsRepository.findEventById(eventId);
};
