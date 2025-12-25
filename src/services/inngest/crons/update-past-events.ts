import { inngest } from '../client';
import { db } from '@/drizzle/db';
import { EventTable } from '@/drizzle/schemas/event-table';
import { and, eq, lt } from 'drizzle-orm';

/**
 * Scheduled function that runs every 2 minutes to close events
 * that have already occurred (held_on time has passed)
 *
 * NOTE: 2-minute interval is for testing purposes only.
 * Adjust the cron schedule for production use.
 */
export const updatePastEvents = inngest.createFunction(
  {
    id: 'update-past-events',
    name: 'Update Past Events to Closed',
  },

  { cron: '0 */2 * * *' },
  async ({ step }) => {
    const result = await step.run('close-past-events', async () => {
      try {
        const now = new Date();

        const updatedEvents = await db
          .update(EventTable)
          .set({
            open: false,
            updatedAt: now,
          })
          .where(and(lt(EventTable.held_on, now), eq(EventTable.open, true)))
          .returning({ id: EventTable.id, name: EventTable.name });

        console.log(
          `[update-past-events] Successfully closed ${updatedEvents.length} event(s) at ${now.toISOString()}`
        );

        return {
          success: true,
          closedCount: updatedEvents.length,
          closedEvents: updatedEvents,
          executedAt: now.toISOString(),
        };
      } catch (error) {
        console.error('[update-past-events] Error closing past events:', error);
        throw error;
      }
    });

    return result;
  }
);
