import { Suspense } from 'react';
import { EventsGridSkeleton } from '@/features/events/components';
import { StatsSection } from './_components/StatsSection';
import { StatsSkeleton } from './_components/StatsSkeleton';
import { EventsSection } from './_components/EventsSection';
import { cacheLife } from 'next/cache';

export default async function MyEventsPage() {
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
        <EventsSection />
      </Suspense>
    </>
  );
}
