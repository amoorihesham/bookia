import { EventTable, UserTable } from '@/drizzle/schema';
import { EventCard } from './event-card';

type Props = { events: (typeof EventTable.$inferSelect & { organizer: typeof UserTable.$inferSelect | null })[] };

export const EventsGrid = async ({ events }: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
        />
      ))}
    </div>
  );
};
