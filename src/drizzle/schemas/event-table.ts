import { boolean, date, integer, pgTable, real, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { relations } from 'drizzle-orm';

export const EventTable = pgTable('events', {
  id,
  name: varchar().notNull(),
  organizer: varchar()
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
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
    fields: [EventTable.organizer],
    references: [UserTable.id],
  }),
}));
