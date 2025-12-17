import { EventCardCompound, EventsGridSkeleton } from '@/features/events/components';
import { GetUserEventsAction } from '@/features/events/actions/query';
import { EmptyComponent } from '@/components/shared';
import { Suspense } from 'react';
import { StatsSection } from './_components/StatsSection';
import { StatsSkeleton } from './_components/StatsSkeleton';

export default async function MyEventsPage() {
  const events = await GetUserEventsAction();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Events in numbers</h1>
        <p className="text-xs lg:text-base">
          Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
          level up your next event.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

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
