import { EventCard } from './event-card';
import { GetEventsAction } from '../actions/query';
import { cacheLife } from 'next/cache';

export const EventsGrid = async ({ term }: { term: 'all' | 'featured' | 'today' | 'expired' }) => {
  'use cache';
  cacheLife('seconds');
  const events = await GetEventsAction(term);
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
