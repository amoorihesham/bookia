import { cacheTag, revalidatePath, updateTag } from 'next/cache';

export function UpdateUserEventsAndStatsCache(userId: string) {
  updateTag(`events-${userId}`);
  updateTag(`stats-${userId}`);
}

export function SetUserEventsAndStatsCache(userId: string) {
  cacheTag(`events-${userId}`);
  cacheTag(`stats-${userId}`);
}

export function RevalidateAllPagesCache() {
  revalidatePath('/');
  revalidatePath('/expired');
  revalidatePath('/today');
  revalidatePath('/upcoming');
  revalidatePath('/featured');
}
