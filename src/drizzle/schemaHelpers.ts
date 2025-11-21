import { timestamp } from 'drizzle-orm/pg-core';

export const createdAt = timestamp({ mode: 'date' }).notNull().defaultNow();
export const updatedAt = timestamp({ mode: 'date' })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
