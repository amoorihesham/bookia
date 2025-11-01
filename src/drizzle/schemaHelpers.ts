import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const id = uuid().primaryKey().defaultRandom().primaryKey();
export const createdAt = timestamp({ withTimezone: true, mode: 'string' }).notNull().defaultNow();
export const updatedAt = timestamp({ withTimezone: true, mode: 'string' })
  .notNull()
  .defaultNow()
  .$onUpdate(() => String(new Date()));
