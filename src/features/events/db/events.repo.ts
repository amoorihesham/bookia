import { eq, lt, sql } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { EventTable } from '@/drizzle/schema';

const eventsRepository = {
  findHomePageEvents: async () =>
    db.query.EventTable.findMany({
      where: eq(EventTable.open, true),
      with: { organizer: true },
      orderBy: (event, { desc }) => [desc(event.featured)],
    }),
  findUpcomingPageEvents: () =>
    db.query.EventTable.findMany({
      where: eq(EventTable.held_on, sql`CURRENT_DATE`),
      with: { organizer: true },
      orderBy: (event, { desc }) => [desc(event.featured)],
    }),
  findExpiredPageEvents: () =>
    db.query.EventTable.findMany({
      where: lt(EventTable.held_on, sql`CURRENT_DATE`),
      with: { organizer: true },
      orderBy: (event, { desc }) => [desc(event.featured)],
    }),
  findFeaturedPageEvents: () =>
    db.query.EventTable.findMany({
      where: eq(EventTable.featured, true),
      with: { organizer: true },
      orderBy: (event, { desc }) => [desc(event.featured)],
    }),
  findTodayPageEvent: () =>
    db.query.EventTable.findMany({
      where: eq(EventTable.held_on, sql`CURRENT_DATE`),
      with: { organizer: true },
      orderBy: (event, { desc }) => [desc(event.featured)],
    }),
  findAllEvents: async () => {
    return db.query.EventTable.findMany({
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
