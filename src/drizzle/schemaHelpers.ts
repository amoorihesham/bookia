import { timestamp } from 'drizzle-orm/pg-core';

export const createdAt = timestamp({ withTimezone: true, mode: 'string' }).notNull().defaultNow();
export const updatedAt = timestamp({ withTimezone: true, mode: 'string' })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date().toISOString());
