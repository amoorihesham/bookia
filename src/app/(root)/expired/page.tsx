import { Suspense } from 'react';
import { GetExpiredpageEvents } from '@/features/events/actions/query';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';

export default async function ExpiredPage() {
  // const events = await GetExpiredpageEvents();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Past Events That Made Memories</h1>
        <p className="text-xs lg:text-base">
          Missed an event? Don&apos;t worry — here&apos;s a look back at all the past experiences that have already
          taken place. Relive the moments and get inspired for what&apos;s coming next!
        </p>
      </div>

      {/* <Suspense fallback={<EventsGridSkeleton />}>
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
      </Suspense> */}
    </>
  );
}
