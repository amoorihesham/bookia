import { PLANS, PlanTable } from '@/drizzle/schema';

export type PlanType = typeof PlanTable.$inferSelect;
export type InserPlanType = typeof PlanTable.$inferInsert;

export type PlanNameType = (typeof PLANS.enumValues)[number];
