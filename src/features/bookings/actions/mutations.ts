import { bookingTable } from '@/drizzle/schema';
import bookingsRepository from '../db/bookings.repo';

export const insertNewBookingRecordAction = async (payload: typeof bookingTable.$inferInsert) => {
  return bookingsRepository.insertNewBooking(payload);
};

export const updateBookingAction = async () => {};
export const cancelBookingAction = async () => {};
export const deleteBookingAction = async () => {};
