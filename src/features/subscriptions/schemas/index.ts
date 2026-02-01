import z from 'zod';

export const updateSubscriptionSchema = z.object({
  planId: z.string().min(1, { message: 'Plan id is required' }),
  is_active: z
    .string()
    .transform(v => v === 'true')
    .refine(v => typeof v === 'boolean', { message: 'is_active must be a boolean' }),
});

export type updateSubscriptionType = z.input<typeof updateSubscriptionSchema>;
