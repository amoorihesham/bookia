import z from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(1, { message: 'Plane name is required' }),
  price: z
    .string()
    .transform(v => parseFloat(v))
    .refine(v => !isNaN(v) && v > 0, {
      message: 'Plan price must be greater than 0',
    }),
  benfits: z.string().transform(v => v.split(',').map(s => s.trim())),
});

export type CreateNewPlanInput = z.input<typeof createPlanSchema>;
