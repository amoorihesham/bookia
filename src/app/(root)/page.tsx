import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';

export default async function Homepage() {
  return (
    <div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='all' />
      </Suspense>
    </div>
  );
}
