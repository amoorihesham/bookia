import { db } from '@/drizzle/db';
import { PlanTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { InserPlanType, PlanNameType } from '../types';

const plansRepository = {
  findPlanByName: async (planName: PlanNameType) => db.select().from(PlanTable).where(eq(PlanTable.name, planName)),
  findAllPlans: async () => db.select().from(PlanTable),
  createPlan: async (payload: InserPlanType) => db.insert(PlanTable).values(payload).returning(),
  deletePlan: async (planId: string) => db.delete(PlanTable).where(eq(PlanTable.id, planId)),
};

export default plansRepository;
