import { cacheLife, cacheTag, updateTag } from 'next/cache';

type PagesCacheTags =
  | 'home-page-events'
  | 'today-page-events'
  | 'expired-page-events'
  | 'featured-page-events'
  | 'upcoming-page-events';

type CacheTime = 'hours' | 'minutes' | 'seconds' | 'max' | 'weeks' | 'default' | 'days';

export function setPageCacheTag(tag: PagesCacheTags, life: CacheTime) {
  cacheLife(life as any);
  cacheTag(tag);
}

export function updatePageCacheTag(tag: PagesCacheTags) {
  updateTag(tag);
}

export function updateAllPagesCacheTag() {
  updatePageCacheTag('home-page-events');
  updatePageCacheTag('expired-page-events');
  updatePageCacheTag('today-page-events');
  updatePageCacheTag('featured-page-events');
  updatePageCacheTag('upcoming-page-events');
}

export function SetUserStatsCacheTag(userId: string, life: CacheTime) {
  cacheLife(life as any);
  cacheTag(`stats-${userId}`);
}

export function SetUserEventsCacheTag(userId: string, life: CacheTime) {
  cacheLife(life as any);
  cacheTag(`events-${userId}`);
}

export function UpdateUserEventsAndStatsCacheTag(userId: string) {
  updateTag(`events-${userId}`);
  updateTag(`stats-${userId}`);
}
