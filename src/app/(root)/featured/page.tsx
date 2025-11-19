import { EventsGrid, EventsGridSkeleton } from '@/features/events/components';
import { Suspense } from 'react';

export default async function FeaturedPage() {
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Featured Events You Can&apos;t Miss</h1>
        <p className='text-xs lg:text-base'>
          Discover our hand-picked selection of standout events! These are the most exciting experiences happening
          around — make sure you&apos;re part of them before they&apos;re gone!
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid term='featured' />
      </Suspense>
    </>
  );
}
