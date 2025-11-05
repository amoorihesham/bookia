import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';
import { cacheLife } from 'next/cache';

export default async function Homepage() {
  'use cache';
  cacheLife('days');
  return (
    <div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid />
      </Suspense>
    </div>
  );
}
