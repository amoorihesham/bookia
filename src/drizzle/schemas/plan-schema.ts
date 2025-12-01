import { pgTable, real, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { relations } from 'drizzle-orm';
import { SubscriptionTable } from './subscription-schema';
import { UserTable } from './user-schema';

export const PlanTable = pgTable('plans', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar().notNull().unique(),
  price: real().notNull(),
  stripe_price_id: varchar().unique(),
  benfits: text().array().notNull(),
  createdAt,
  updatedAt,
});

export const PlanRelations = relations(PlanTable, ({ many }) => ({
  subscriptions: many(SubscriptionTable, {
    relationName: 'subscriptions_plans',
  }),
  users: many(UserTable, { relationName: 'users_plans' }),
}));
