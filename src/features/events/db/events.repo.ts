import { db } from '@/drizzle/db';
import { EventTable } from '@/drizzle/schema';
import { eq, gt, lt, sql } from 'drizzle-orm';

const eventsRepository = {
  findAllEvents: async () => db.query.EventTable.findMany({ with: { organizer: true } }),
  findAllFeaturedEvents: async () => db.query.EventTable.findMany({ where: eq(EventTable.featured, true) }),
  findAllExpiredEvents: async () => db.query.EventTable.findMany({ where: lt(EventTable.held_on, sql`CURRENT_DATE`) }),
  findAllTodayEvents: async () => db.query.EventTable.findMany({ where: eq(EventTable.held_on, sql`CURRENT_DATE`) }),
  findAllFutureEvents: async () => db.query.EventTable.findMany({ where: gt(EventTable.held_on, sql`CURRENT_DATE`) }),
  findEventById: async (eventId: string) => db.query.EventTable.findMany({ where: eq(EventTable.id, eventId) }),
  insertNewEvent: async (payload: typeof EventTable.$inferInsert) => db.insert(EventTable).values(payload).returning(),
  updateEvent: async (eventId: string, payload: Partial<typeof EventTable.$inferInsert>) =>
    db.update(EventTable).set(payload).where(eq(EventTable.id, eventId)).returning(),
  deleteEvent: async (eventId: string) => db.delete(EventTable).where(eq(EventTable.id, eventId)),
};

export default eventsRepository;
