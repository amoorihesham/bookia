import { EventCard } from '@/features/events/components';
import { cn } from '@/lib/utils';
import { GetUserEventsAction } from '@/features/events/actions/query';
import { EmptyComponent } from '@/components/shared';

export default async function StatsSection() {
  const { events, count, close_count, featured_count, open_count } = await GetUserEventsAction();

  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Events in numbers</h1>
        <p className='text-xs lg:text-base'>
          Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
          level up your next event.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto'>
        <div className='space-y-0 lg:space-y-4 flex-col flex items-center pb-4 lg:py-4 border-b lg:border-r lg:border-b-0'>
          <div className='text-3xl lg:text-5xl font-bold'>+{count}</div>
          <p className='text-sm lg:text-base'>Total Events</p>
        </div>
        <div className='space-y-0 lg:space-y-4 flex-col flex items-center pb-4 lg:py-4 border-b lg:border-r lg:border-b-0'>
          <div className='text-3xl lg:text-5xl font-bold'>{featured_count}</div>
          <p className='text-sm lg:text-base'>Featured Events</p>
        </div>
        <div className='space-y-0 lg:space-y-4 flex-col flex items-center pb-4 lg:py-4 border-b lg:border-r lg:border-b-0'>
          <div className='text-3xl lg:text-5xl font-bold'>{open_count}</div>
          <p className='text-sm lg:text-base'>Open Events</p>
        </div>
        <div className='space-y-0 lg:space-y-4 flex-col flex items-center pb-4 lg:py-4'>
          <div className='text-3xl lg:text-5xl font-bold'>{close_count}</div>
          <p className='text-sm lg:text-base'>Closed Events</p>
        </div>
      </div>
      {events.length ? (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-14')}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      ) : (
        <EmptyComponent className='mt-10' />
      )}
    </>
  );
}
