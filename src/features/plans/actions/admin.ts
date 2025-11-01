'use server';

import { PlanTable } from '@/drizzle/schema';
import { insertPlan } from '../db';

export const createNewPlan = async (unSafeData: typeof PlanTable.$inferInsert) => {
  try {
    const result =await insertPlan(unSafeData);
  } catch (error) {
    console.log(error);
  }
};
