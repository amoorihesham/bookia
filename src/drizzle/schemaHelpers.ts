import { timestamp } from 'drizzle-orm/pg-core';

export const createdAt = timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow();
export const updatedAt = timestamp({ withTimezone: true, mode: 'date' })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
