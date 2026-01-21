import { UserTable } from '@/drizzle/schema';

export type DatabaseUser = typeof UserTable.$inferSelect;

export type UpdateUserPayload = Partial<DatabaseUser>;

export type CreateNewUserPayload = typeof UserTable.$inferInsert;
