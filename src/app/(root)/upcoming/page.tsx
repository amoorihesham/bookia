import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';

export default async function UpcomingPage() {
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Upcoming Events to Look Forward To</h1>
        <p className='text-xs lg:text-base'>
          Get ready for what&apos;s next! Explore all the exciting events coming up and plan your experiences ahead of
          time — don&apos;t miss out on the fun!
        </p>
      </div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='upcoming' />
      </Suspense>
    </>
  );
}
