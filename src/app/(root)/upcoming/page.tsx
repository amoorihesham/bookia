import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';

export default async function UpcomingPage() {
  return (
    <div className='py-10'>
      <div className='mx-auto max-w-2xl space-y-4 text-center mb-12'>
        <h1 className='text-center text-4xl font-semibold lg:text-5xl'>What&apos;s Happening in future?</h1>
        <p>
          Ready for some excitement? Browse all events taking place in future and jump into the experiences happening
          around you!
        </p>
      </div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='upcoming' />
      </Suspense>
    </div>
  );
}
