import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetEventsAction } from '@/features/events/actions/query';

export default async function FeaturedPage() {
  const events = await GetEventsAction('featured');

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Featured Events You Can&apos;t Miss</h1>
        <p className="text-xs lg:text-base">
          Discover our hand-picked selection of standout events! These are the most exciting experiences happening
          around — make sure you&apos;re part of them before they&apos;re gone!
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
