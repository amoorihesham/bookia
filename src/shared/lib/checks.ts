import { UserTable } from '@/drizzle/schema';

export function requireAdmin(user: typeof UserTable.$inferSelect) {
  return user.role === 'admin';
}
