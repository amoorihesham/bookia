import { Suspense } from 'react';
import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';

export default async function TodayPage() {
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>What&apos;s Happening Today?</h1>
        <p className='text-xs lg:text-base'>
          Ready for some excitement? Browse all events taking place today and jump into the experiences happening around
          you!
        </p>
      </div>
      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='today' />
      </Suspense>
    </>
  );
}
