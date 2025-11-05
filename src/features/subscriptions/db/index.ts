import { db } from '@/drizzle/db';
import { SubscriptionTable, UserTable } from '@/drizzle/schema';
import { getPlanById, queryPlans } from '@/features/plans/db';

export const createNewSubscription = async (user: typeof UserTable.$inferSelect) => {
  try {
    const plan = await getPlanById(user.plan_id!);
    const subscription = await db
      .insert(SubscriptionTable)
      .values({
        userId: user?.id,
        planId: plan?.id,
        activated: new Date().toISOString(),
        max_featured_count: plan?.max_featured_count,
        remain_featured_count: plan?.max_featured_count,
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
