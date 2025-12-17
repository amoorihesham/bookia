import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetEventsAction } from '@/features/events/actions/query';

export default async function UpcomingPage() {
  const events = await GetEventsAction('upcoming');

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Upcoming Events to Look Forward To</h1>
        <p className="text-xs lg:text-base">
          Get ready for what&apos;s next! Explore all the exciting events coming up and plan your experiences ahead of
          time — don&apos;t miss out on the fun!
        </p>
      </div>
      <Suspense fallback={<EventsGridSkeleton />}>
        {events.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {events.map(event => (
              <EventCardCompound
                event={event}
                key={event.id}
              />
            ))}
          </div>
        ) : (
          <EmptyComponent />
        )}
      </Suspense>
    </>
  );
}
