import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { ROLES } from './enums';
import { PlanTable } from './plan-schema';
import { relations } from 'drizzle-orm';
import { SubscriptionTable } from './subscription-schema';
import { EventTable } from './event-table';
import { bookingTable } from './booking-table';

export const UserTable = pgTable('users', {
  clerk_id: varchar().primaryKey().notNull(),
  username: varchar().notNull().unique(),
  email: varchar().notNull().unique(),
  image: varchar().notNull(),
  method: varchar().notNull(),
  role: ROLES('role').notNull().default('user'),
  plan_id: uuid().references(() => PlanTable.id, { onDelete: 'set null' }),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  plan: one(PlanTable, {
    fields: [UserTable.plan_id],
    references: [PlanTable.id],
  }),
  subscription: one(SubscriptionTable),
  events: many(EventTable, {
    relationName: 'user_events',
  }),
  bookings: many(bookingTable, {
    relationName: 'user_bookings',
  }),
}));
