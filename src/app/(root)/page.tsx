import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';
import { GetAllEventsAction } from '@/features/events/actions/query';
import { cacheLife } from 'next/cache';

export default async function Homepage() {
  const events = await GetAllEventsAction();

  return (
    <div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid events={events} />
      </Suspense>
    </div>
  );
}
