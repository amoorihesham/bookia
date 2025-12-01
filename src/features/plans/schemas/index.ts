import z from 'zod';

export const insertPlanSchema = z.object({
  name: z.string().min(1, { message: 'Plane name is required' }),
  frequency: z.string().min(1, { message: 'Plane frequency is required' }),
  price: z
    .string()
    .transform(v => parseFloat(v))
    .refine(v => !isNaN(v) && v > 0, {
      message: 'Plan price must be greater than 0',
    }),
  max_featured_count: z
    .string()
    .transform(v => parseInt(v))
    .refine(v => !isNaN(v) && v > 0, {
      message: 'Plan max featured count must be greater than 0',
    }),
});

export type createNewPlanInput = z.input<typeof insertPlanSchema>;
