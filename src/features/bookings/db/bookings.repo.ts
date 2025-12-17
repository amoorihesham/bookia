import { db } from '@/drizzle/db';
import { bookingTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const bookingsRepository = {
  getAllBookings: async () => db.query.bookingTable.findMany({ with: { event: true } }),
  getBookingById: async (bookingId: string) =>
    db.query.bookingTable.findFirst({ where: eq(bookingTable.id, bookingId), with: { event: true } }),
  getUserBookings: async (userId: string) =>
    db.query.bookingTable.findMany({ where: eq(bookingTable.user_id, userId), with: { event: true } }),
  insertNewBooking: async (payload: typeof bookingTable.$inferInsert) =>
    db.insert(bookingTable).values(payload).returning(),
  deleteBooking: async (bookingId: string) => db.delete(bookingTable).where(eq(bookingTable.id, bookingId)),
};

export default bookingsRepository;
