import { db } from '@/drizzle/db';
import { PlanTable, SubscriptionTable, UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export const createNewSubscription = async (user: typeof UserTable.$inferSelect) => {
  try {
    const plan = await db.query.PlanTable.findFirst({ where: eq(PlanTable.name, user.plan) });
    if (!plan) throw new Error('Plan not found');

    const subscription = await db
      .insert(SubscriptionTable)
      .values({
        userId: user?.id,
        planId: plan.id,
        activated: new Date().toISOString(),
        max_featured_count: plan.max_featured_count.toString(),
        remain_featured_count: plan.max_featured_count.toString(),
        valid: true,
        remain: '3',
        renewAt: new Date().toISOString(),
      })
      .returning();

    return subscription;
  } catch (error) {
    console.log(error);
  }
};
