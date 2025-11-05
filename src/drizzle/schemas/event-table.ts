import { boolean, date, integer, pgTable, real, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { relations } from 'drizzle-orm';

export const EventTable = pgTable('events', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: varchar().references(() => UserTable.clerk_id, { onDelete: 'cascade' }),
  name: varchar().notNull(),
  ticket_price: real().notNull(),
  tickets: integer().notNull(),
  place: varchar().notNull(),
  guests: varchar().array(),
  featured: boolean().default(false),
  held_on: date().notNull(),
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
