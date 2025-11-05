import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';
import { Suspense } from 'react';

export default function Homepage() {
  return (
    <div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid />
      </Suspense>
    </div>
  );
}
