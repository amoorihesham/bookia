import { pgEnum } from 'drizzle-orm/pg-core';

export const ROLES = pgEnum('ROLES', ['admin', 'user']);
export const PLANS = pgEnum('PLANS', ['free', 'start-up', 'ultimate']);
