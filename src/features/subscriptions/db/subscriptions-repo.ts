import { db } from '@/drizzle/db';
import { SubscriptionTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const subscriptionsRepository = {
  findUserSubscription: (userId: string) =>
    db
      .select()
      .from(SubscriptionTable)
      .where(eq(SubscriptionTable.user_id, userId)),
  insertNewSubscription: async (
    payload: typeof SubscriptionTable.$inferInsert
  ) => db.insert(SubscriptionTable).values(payload).returning(),
  updateSubscription: (
    subscriptionId: string,
    payload: Partial<typeof SubscriptionTable.$inferInsert>
  ) =>
    db
      .update(SubscriptionTable)
      .set(payload)
      .where(eq(SubscriptionTable.id, subscriptionId))
      .returning(),
};

export default subscriptionsRepository;
