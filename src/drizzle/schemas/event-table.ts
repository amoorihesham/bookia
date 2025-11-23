import { boolean, integer, pgTable, real, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { relations } from 'drizzle-orm';

export const EventTable = pgTable('events', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: varchar().references(() => UserTable.clerk_id, {
    onDelete: 'cascade',
  }),
  name: varchar().notNull(),
  ticket_price: real().notNull(),
  tickets: integer().notNull(),
  place: varchar().notNull(),
  guests: varchar().array(),
  featured: boolean().default(false),
  held_on: timestamp({ withTimezone: false, mode: 'date' }).notNull(),
  cover_thumbnail: varchar().notNull(),
  max_ticket_user_can_book: integer().notNull().default(1),
  open: boolean().default(true),
  createdAt,
  updatedAt,
});

export const EvenetRelations = relations(EventTable, ({ one }) => ({
  organizer: one(UserTable, {
    fields: [EventTable.user_id],
    references: [UserTable.clerk_id],
  }),
}));
