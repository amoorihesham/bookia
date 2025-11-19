import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';

export default async function Homepage() {
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Discover All Events Around You</h1>
        <p className='text-xs lg:text-base'>
          Get ready for an adventure! Browse all events happening near you — from today&apos;s highlights to upcoming
          experiences — and find your next unforgettable moment.
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='all' />
      </Suspense>
    </>
  );
}
