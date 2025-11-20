import { boolean, date, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { PlanTable } from './plan-schema';
import { relations } from 'drizzle-orm';

export const SubscriptionTable = pgTable('subscriptions', {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: varchar()
    .notNull()
    .references(() => UserTable.clerk_id, { onDelete: 'cascade' }),
  plan_id: uuid()
    .notNull()
    .references(() => PlanTable.id, { onDelete: 'set null' }),
  is_active: boolean().notNull().default(true),
  activated_at: date().notNull(),
  renew_at: date().notNull(),
  remaining_days: integer().notNull(),
  max_featured_events: integer().notNull(),
  remaining_featured_events: integer().notNull(),
  stripe_customer_id: varchar().unique(),
  createdAt,
  updatedAt,
});

export const SubscriptionRelations = relations(SubscriptionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SubscriptionTable.user_id],
    references: [UserTable.clerk_id],
  }),
  plan: one(PlanTable, {
    fields: [SubscriptionTable.plan_id],
    references: [PlanTable.id],
  }),
}));
