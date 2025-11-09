import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { UserTable } from './user-schema';
import { EventTable } from './event-table';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';

export const bookingTable = pgTable('bookings', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: varchar()
    .notNull()
    .references(() => UserTable.clerk_id),
  event_id: uuid()
    .notNull()
    .references(() => EventTable.id),
  createdAt,
  updatedAt,
});

export const bookingsRelation = relations(bookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [bookingTable.user_id],
    references: [UserTable.clerk_id],
  }),
  event: one(EventTable, {
    fields: [bookingTable.event_id],
    references: [EventTable.id],
  }),
}));
