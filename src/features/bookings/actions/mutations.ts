import { bookingTable } from '@/drizzle/schema';
import bookingsRepository from '../db/bookings.repo';

export const insertNewBookingRecordAction = async (payload: typeof bookingTable.$inferInsert) => {
  return bookingsRepository.insertNewBooking(payload);
};
