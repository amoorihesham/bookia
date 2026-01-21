import { SubscriptionTable } from '@/drizzle/schema';

export type SubscriptionType = typeof SubscriptionTable.$inferSelect;
