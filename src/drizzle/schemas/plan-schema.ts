import { numeric, pgTable, real, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';
import { SubscriptionTable } from './subscription-schema';

export const PlanTable = pgTable('plans', {
  id,
  name: varchar('name').notNull().unique(),
  price: real('price').notNull(),
  max_featured_count: numeric('max_featured_count').notNull().default('3'),
  createdAt,
  updatedAt,
});

export const PlanRelations = relations(PlanTable, ({ many }) => ({
  subscriptions: many(SubscriptionTable),
}));
