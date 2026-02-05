import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { and, count, eq, gte, lt, sql } from 'drizzle-orm';

const userRepository = {
  findAllUsers: async () => db.query.UserTable.findMany({ with: { plan: true } }),
  findUserById: async (userId: string) => db.query.UserTable.findFirst({ where: eq(UserTable.clerk_id, userId) }),
  findUserByEmail: async (email: string) => db.select().from(UserTable).where(eq(UserTable.email, email)),
  findUserByUsername: async (username: string) => db.select().from(UserTable).where(eq(UserTable.username, username)),
  insertNewUser: async (payload: typeof UserTable.$inferInsert) => db.insert(UserTable).values(payload).returning(),
  updateUser: async (userId: string, payload: Partial<typeof UserTable.$inferInsert>) =>
    db.update(UserTable).set(payload).where(eq(UserTable.clerk_id, userId)).returning(),
  deleteUser: async (userId: string) => db.delete(UserTable).where(eq(UserTable.clerk_id, userId)).returning(),
  getCurrentMonthCount: async ({ startOfThisMonth }: { startOfThisMonth: Date }) =>
    db
      .select({ count: count() })
      .from(UserTable)
      .where(and(gte(UserTable.createdAt, startOfThisMonth))),
  getPreviousMonthCount: async ({
    startOfPrevMonth,
    startOfThisMonth,
  }: {
    startOfPrevMonth: Date;
    startOfThisMonth: Date;
  }) =>
    db
      .select({ count: count() })
      .from(UserTable)
      .where(and(gte(UserTable.createdAt, startOfPrevMonth), lt(UserTable.createdAt, startOfThisMonth))),
  getTotalUsersCount: async () => db.select({ count: count() }).from(UserTable),
};

export default userRepository;
