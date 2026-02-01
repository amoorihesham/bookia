import { db } from '@/drizzle/db';
import { SubscriptionTable } from '@/drizzle/schema';
import { desc, eq } from 'drizzle-orm';

const subscriptionsRepository = {
  findAll: () =>
    db.query.SubscriptionTable.findMany({
      with: { user: true, plan: true },
      orderBy: [desc(SubscriptionTable.createdAt)],
    }),
  findSubscriptionById: (subscriptionId: string) =>
    db.query.SubscriptionTable.findFirst({
      where: eq(SubscriptionTable.id, subscriptionId),
      with: { user: true, plan: true },
    }),
  findUserSubscription: (userId: string) =>
    db.select().from(SubscriptionTable).where(eq(SubscriptionTable.user_id, userId)),
  insertNewSubscription: async (payload: typeof SubscriptionTable.$inferInsert) =>
    db.insert(SubscriptionTable).values(payload).returning(),
  updateSubscription: (subscriptionId: string, payload: Partial<typeof SubscriptionTable.$inferInsert>) =>
    db.update(SubscriptionTable).set(payload).where(eq(SubscriptionTable.id, subscriptionId)).returning(),
};

export default subscriptionsRepository;
