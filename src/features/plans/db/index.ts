import { db } from '@/drizzle/db';
import { PlanTable } from '@/drizzle/schema';

export const insertPlan = async (values: typeof PlanTable.$inferInsert) => {
  const result = await db.insert(PlanTable).values(values).returning();
  return result[0];
};
