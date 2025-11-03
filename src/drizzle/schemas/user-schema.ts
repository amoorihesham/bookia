import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { ROLES } from './enums';
import { relations } from 'drizzle-orm';
import { PlanTable } from './plan-schema';
import { SubscriptionTable } from './subscription-schema';
import { EventTable } from './event-table';

export const UserTable = pgTable('users', {
  id: varchar().primaryKey(),
  username: varchar().notNull(),
  email: varchar().notNull().unique(),
  image: varchar().notNull(),
  method: varchar().notNull(),
  role: ROLES('role').notNull().default('user'),
  plan_id: uuid().references(() => PlanTable.id),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ one, many }) => {
  return {
    plan: one(PlanTable, {
      fields: [UserTable.id],
      references: [PlanTable.id],
    }),
    subscription: one(SubscriptionTable),
    events: many(EventTable, {
      relationName: 'user_events',
    }),
  };
});
