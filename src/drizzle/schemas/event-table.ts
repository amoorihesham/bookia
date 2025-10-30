import { boolean, date, numeric, pgTable, real, time, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { relations } from 'drizzle-orm';

export const EventTable = pgTable('events', {
  id,
  name: varchar().notNull(),
  orgainer: varchar()
    .references(() => UserTable.id)
    .notNull(),
  ticket_price: real().notNull(),
  tickets: numeric().notNull().default('1'),
  place: varchar().notNull(),
  gusts: varchar().array(),
  featured: boolean().default(false),
  held_on: date().notNull(),
  open: boolean().default(true),
  createdAt,
  updatedAt,
});

export const EvenetRelations = relations(EventTable, ({ one }) => ({
  organizer: one(UserTable, {
    fields: [EventTable.orgainer],
    references: [UserTable.id],
  }),
}));
