import { integer, pgTable, real, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';
import { SubscriptionTable } from './subscription-schema';
import { UserTable } from './user-schema';

export const PlanTable = pgTable('plans', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar().notNull().unique(),
  price: real().notNull(),
  max_featured_count: integer().notNull(),
  frequancy: varchar().notNull(),
  createdAt,
  updatedAt,
});

export const PlanRelations = relations(PlanTable, ({ many }) => ({
  subscriptions: many(SubscriptionTable, { relationName: 'subscriptions_plans' }),
  users: many(UserTable, { relationName: 'users_plans' }),
}));
