import { boolean, date, numeric, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schemaHelpers';
import { UserTable } from './user-schema';
import { PlanTable } from './plan-schema';
import { relations } from 'drizzle-orm';

export const SubscriptionTable = pgTable('subscriptions', {
  id,
  userId: varchar('user_id').references(() => UserTable.id),
  planId: uuid('plan_id').references(() => PlanTable.id),
  valid: boolean().notNull().default(true),
  activated: date().notNull(),
  renewAt: date('renew_at').notNull(),
  remain: numeric().notNull(),
  max_featured_count: numeric().notNull(),
  remain_featured_count: numeric().notNull(),
  createdAt,
  updatedAt,
});

export const SubscriptionRelations = relations(SubscriptionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [SubscriptionTable.userId],
    references: [UserTable.id],
  }),
  plan: one(PlanTable, {
    fields: [SubscriptionTable.planId],
    references: [PlanTable.id],
  }),
}));
