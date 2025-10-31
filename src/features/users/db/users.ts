import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function insertUser(user: typeof UserTable.$inferInsert) {
  await db.insert(UserTable).values(user).onConflictDoNothing();

  revalidateTag(user.id, { expire: 1000 });
}

export async function updateUser(id: string, user: Partial<typeof UserTable.$inferInsert>) {
  await db.update(UserTable).set(user).where(eq(UserTable.id, id));

  revalidateTag(id, { expire: 1000 });
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));

  revalidateTag(id, { expire: 1000 });
}
