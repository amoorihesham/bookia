import { GetAllEventsAction } from '../actions/query';
import { EventCard } from './event-card';

export const EventsGrid = async () => {
  const events = await GetAllEventsAction();

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
