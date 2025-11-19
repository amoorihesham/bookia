import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';
import { Suspense } from 'react';

export default async function ExpiredPage() {
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Past Events That Made Memories</h1>
        <p className='text-xs lg:text-base'>
          Missed an event? Don&apos;t worry — here&apos;s a look back at all the past experiences that have already
          taken place. Relive the moments and get inspired for what&apos;s coming next!
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='expired' />
      </Suspense>
    </>
  );
}
