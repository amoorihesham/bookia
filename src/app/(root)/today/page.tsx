import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { GetTodaypageEvents } from '@/features/events/actions/query';
import { EmptyComponent } from '@/components/shared';

export default async function TodayPage() {
  const events = await GetTodaypageEvents();
  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">What&apos;s Happening Today?</h1>
        <p className="text-xs lg:text-base">
          Ready for some excitement? Browse all events taking place today and jump into the experiences happening around
          you!
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
