import { EventsGrid } from '@/features/events/components/events-grid';
import { Suspense } from 'react';

export default function Homepage() {
  return (
    <div>
      <Suspense>
        <EventsGrid />
      </Suspense>
    </div>
  );
}
