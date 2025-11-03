import { PlanTable } from '@/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

export const insertPlanSchema = createInsertSchema(PlanTable);
