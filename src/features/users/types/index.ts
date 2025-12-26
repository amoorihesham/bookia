import { UserTable } from '@/drizzle/schema';

export type DatabaseUser = typeof UserTable.$inferSelect;
