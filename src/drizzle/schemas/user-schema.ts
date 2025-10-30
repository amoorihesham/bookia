import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { PLANS, ROLES } from './enums';
import { relations } from 'drizzle-orm';
import { PlanTable } from './plan-schema';
import { SubscriptionTable } from './subscription-schema';
import { EventTable } from './event-table';

export const UserTable = pgTable('users', {
  id: varchar('id').primaryKey().notNull(),
  username: varchar('username').notNull(),
  email: varchar('email').notNull().unique(),
  image: varchar('image'),
  method: varchar('method').notNull(),
  plan: PLANS('plan').notNull().default('free'),
  role: ROLES('role').notNull().default('user'),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ one, many }) => {
  return {
    plan: one(PlanTable),
    subscription: one(SubscriptionTable),
    events: many(EventTable, {
      relationName: 'user_events',
    }),
  };
});
