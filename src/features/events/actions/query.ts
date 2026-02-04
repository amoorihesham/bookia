'use server';
import { UserTable } from '@/drizzle/schema';
import { setPageCacheTag, SetUserEventsCacheTag, SetUserStatsCacheTag } from '@/shared/utils/cache';
import eventsRepository from '../db/events.repo';

export const GetHomepageRegularEvents = async () => {
  'use cache';
  setPageCacheTag('home-page-regular-events', 'hours');
  return eventsRepository.findHomePageRegularEvents();
};

export const GetHomepageFeaturedEvents = async () => {
  'use cache';
  setPageCacheTag('home-page-featured-events', 'hours');
  return eventsRepository.findFeaturedPageEvents();
};

export const GetTodaypageEvents = async () => {
  'use cache';
  setPageCacheTag('today-page-events', 'hours');
  return eventsRepository.findTodayPageEvent();
};

export const GetExpiredpageEvents = async () => {
  'use cache';
  setPageCacheTag('expired-page-events', 'hours');
  return eventsRepository.findExpiredPageEvents();
};

export const GetUpcomingpageEvents = async () => {
  'use cache';
  setPageCacheTag('upcoming-page-events', 'hours');
  return eventsRepository.findUpcomingPageEvents();
};

export const GetFeaturedpageEvents = async () => {
  'use cache';
  setPageCacheTag('featured-page-events', 'hours');
  return eventsRepository.findFeaturedPageEvents();
};

export const GetUserEventStatsAction = async (user: typeof UserTable.$inferSelect) => {
  'use cache';
  SetUserStatsCacheTag(user.clerk_id, 'hours');
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
  SetUserEventsCacheTag(user.clerk_id, 'hours');

  return eventsRepository.findUserEvents(user.clerk_id);
};

export const GetEventByIdAction = async (eventId: string) => {
  return eventsRepository.findEventById(eventId);
};
