import { EventTable, UserTable } from '@/drizzle/schema';

export function CheckEventAvailabiltyAndPermission(
  event: typeof EventTable.$inferSelect,
  user: typeof UserTable.$inferSelect
) {
  if (!event) throw Error('Event not found');

  if (event.user_id !== user.clerk_id && user.role !== 'admin')
    throw Error('You are not authorized to perform this action');

  if (!event.open) throw Error('Event is not open for booking');

  if (isEventTimePassed(event)) throw Error('Event is expired');

  return true;
}

export function CheckPermission(event: typeof EventTable.$inferSelect, user: typeof UserTable.$inferSelect) {
  if (event.user_id !== user.clerk_id && user.role !== 'admin') return false;

  return true;
}

export function isEventTimePassed(event: typeof EventTable.$inferSelect) {
  return event.held_on < new Date();
}
