import { DrizzleQueryError } from 'drizzle-orm';
import { ZodError } from 'zod';

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return {
      success: false,
      message: error.message,
      errors: error.issues.map(e => e.message),
    };
  }
  if (error instanceof DrizzleQueryError) {
    return {
      success: false,
      message: error.cause?.message.includes('violates foreign key constraint "bookings_event_id_events_id_fk"')
        ? 'Can not delete event that tickets booked.'
        : error.message,
      errors: [],
    };
  }
  if (error instanceof Error) {
    return { success: false, message: error.message, errors: [] };
  }

  return {
    success: false,
    message: (error as Error)?.message || 'Internal error',
    errors: [],
  };
}
