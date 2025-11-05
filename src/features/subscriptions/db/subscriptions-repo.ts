import { db } from '@/drizzle/db';
import { SubscriptionTable } from '@/drizzle/schema';

const subscriptionsRepository = {
  insertNewSubscription: async (payload: typeof SubscriptionTable.$inferInsert) =>
    db.insert(SubscriptionTable).values(payload).returning(),
};

export default subscriptionsRepository;
