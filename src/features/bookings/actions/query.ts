'use server';

import { getCurrentUser } from '@/shared/lib/auth';
import bookingsRepository from '../db/bookings.repo';

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

export const GetUserBookingsAction = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    return await bookingsRepository.getUserBookings(user.clerk_id);
  } catch (error) {
    console.log('Error While Fetch User Bookings.', error);
    return [];
  }
};

export const GetUserBookingsAsOrdersAction = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    const allBookings = await bookingsRepository.getAllBookings();
    return allBookings.filter(b => b.event.user_id === user.clerk_id);
  } catch (error) {
    console.log('Error While Fetch User Bookings.', error);
    return [];
  }
};
