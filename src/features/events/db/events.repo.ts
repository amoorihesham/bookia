import { db } from '@/drizzle/db';
import { EventTable } from '@/drizzle/schema';
import { eq, gt, lt, sql } from 'drizzle-orm';
import { FindEventsFilterTerm } from '../types';

const conditions = {
  featured: eq(EventTable.featured, true),
  expired: lt(EventTable.held_on, sql`CURRENT_DATE`),
  today: eq(EventTable.held_on, sql`CURRENT_DATE`),
  upcoming: gt(EventTable.held_on, sql`CURRENT_DATE`),
};

const eventsRepository = {
  findAllEvents: async (term: FindEventsFilterTerm) => {
    const whereClaus = term === 'all' ? undefined : conditions[term];
    return db.query.EventTable.findMany({
      where: whereClaus,
      with: { organizer: true },
    });
  },
  findUserEvents: async (userId: string) => {
    return db.query.EventTable.findMany({
      where: eq(EventTable.user_id, userId),
      with: { organizer: true },
    });
  },
  findEventById: async (eventId: string) => db.query.EventTable.findMany({ where: eq(EventTable.id, eventId) }),
  insertNewEvent: async (payload: typeof EventTable.$inferInsert) => db.insert(EventTable).values(payload).returning(),
  updateEvent: async (eventId: string, payload: Partial<typeof EventTable.$inferInsert>) =>
    db.update(EventTable).set(payload).where(eq(EventTable.id, eventId)).returning(),
  deleteEvent: async (eventId: string) => db.delete(EventTable).where(eq(EventTable.id, eventId)),
};

export default eventsRepository;
