import { Suspense } from 'react';
import { GetEventsAction } from '@/features/events/actions/query';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';

export default async function Homepage() {
  const events = await GetEventsAction('all');

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Discover All Events Around You</h1>
        <p className="text-xs lg:text-base">
          Get ready for an adventure! Browse all events happening near you — from today&apos;s highlights to upcoming
          experiences — and find your next unforgettable moment.
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        {events.length ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
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
