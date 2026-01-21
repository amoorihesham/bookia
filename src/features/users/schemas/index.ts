import { z } from 'zod';

export const updateUserSchema = z.object({
  username: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  role: z.enum(['user', 'admin']),
  plan: z.string().min(1, 'Plan is required'),
});

export const createNewUserSchema = z.object({
  clerk_id: z.string().min(1, 'Clerk ID is required'),
  username: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email'),
  role: z.enum(['user', 'admin']),
  plan: z.string().min(1, 'Plan is required'),
  method: z.string().min(1, 'Method is required'),
});
