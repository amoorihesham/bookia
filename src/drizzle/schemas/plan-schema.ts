import { integer, pgTable, real, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';
import { SubscriptionTable } from './subscription-schema';

export const PlanTable = pgTable('plans', {
  id,
  name: varchar().notNull().unique(),
  price: real().notNull(),
  max_featured_count: integer().notNull(),
  createdAt,
  updatedAt,
});

export const PlanRelations = relations(PlanTable, ({ many }) => ({
  subscriptions: many(SubscriptionTable),
}));
