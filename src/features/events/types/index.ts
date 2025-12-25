import { EventTable } from '@/drizzle/schema';

export type FindEventsFilterTerm = 'all' | 'featured' | 'today' | 'expired' | 'upcoming';

export type EventType = typeof EventTable.$inferSelect;
