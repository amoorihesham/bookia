import { EventCard } from '@/features/events/components';
import { cn } from '@/lib/utils';
import { GetUserEventsAction } from '@/features/events/actions/query';

export default async function StatsSection() {
  const { events, count, featured_count, open_count, close_count } = await GetUserEventsAction();

  return (
    <section className='py-12 md:py-10'>
      <div className='mx-auto max-w-5xl space-y-8 px-6 md:space-y-16'>
        <div className='relative z-10 mx-auto max-w-xl space-y-6 text-center'>
          <h2 className='text-4xl font-medium lg:text-5xl'>Events in numbers</h2>
          <p>
            Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
            level up your next event.
          </p>
        </div>

        <div className='grid gap-12 divide-y *:text-center md:grid-cols-4 md:gap-2 md:divide-x md:divide-y-0'>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>+{count}</div>
            <p>Total Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>{featured_count}</div>
            <p>Featured Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>{open_count}</div>
            <p>Open Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>{close_count}</div>
            <p>Closed Events</p>
          </div>
        </div>
      </div>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-14')}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </section>
  );
}
