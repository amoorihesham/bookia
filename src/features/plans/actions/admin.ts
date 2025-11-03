'use server';

import { PlanTable } from '@/drizzle/schema';
import { insertPlan } from '../db';
import { insertPlanSchema } from '../schemas';
import { getCurrentUserRole } from '@/features/users/lib';
import { revalidatePath } from 'next/cache';

export const createNewPlan = async (unSafeData: typeof PlanTable.$inferInsert) => {
  try {
    const { success, data, error } = insertPlanSchema.safeParse(unSafeData);
    if (!success) return { success: false, code: 'VALIDATION_ERROR', error: error.message };

    const role = await getCurrentUserRole();
    if (role !== 'admin') return { success: false, code: 'PERMISION_ERROR', error: 'You do not have the permision.' };

    const result = await insertPlan(data);
    revalidatePath('/admin/plans', 'page');
    return { success: true, data: result, message: `New [${result.name}] plan created.` };
  } catch (error) {
    console.log(error, 'HERE');
    return { success: false, code: 'INTERNAL_SERVER_ERROR', error: `Internal server error happen.` };
  }
};
