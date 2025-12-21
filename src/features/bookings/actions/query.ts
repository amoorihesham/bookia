'use server';

import { getCurrentUser } from '@/shared/lib/auth';
import bookingsRepository from '../db/bookings.repo';
import { cacheLife, cacheTag } from 'next/cache';
import { UserTable } from '@/drizzle/schema';

export const GetAllBookingsAction = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    if (user.role === 'admin') return await bookingsRepository.getAllBookings();
    return [];
  } catch (error) {
    console.log('Error While Fetch Bookings.', error);
    return [];
  }
};

export const GetUserBookingsAction = async (user: typeof UserTable.$inferSelect) => {
  'use cache';
  cacheLife('minutes');
  cacheTag(`bookings-${user.clerk_id}`);
  if (!user) return [];
  return bookingsRepository.getUserBookings(user.clerk_id);
};

export const GetUserBookingsAsOrdersAction = async (user: typeof UserTable.$inferSelect) => {
  'use cache';
  cacheLife('minutes');
  cacheTag(`orders-${user.clerk_id}`);
  if (!user) return [];
  const allBookings = await bookingsRepository.getAllBookings();
  return allBookings.filter(b => b.event.user_id === user.clerk_id);
};
