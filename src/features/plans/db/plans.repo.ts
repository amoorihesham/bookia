import { db } from '@/drizzle/db';
import { PLANS, PlanTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const plansRepository = {
  findPlanByName: async (planName: (typeof PLANS.enumValues)[number]) =>
    db.select().from(PlanTable).where(eq(PlanTable.name, planName)),
  findAllPlans: async () => db.select().from(PlanTable),
};

export default plansRepository;
