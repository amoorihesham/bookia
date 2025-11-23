import { CreateNewEventForm } from '@/features/events/components';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

export default async function NewEventPage() {
  'use cache';
  cacheLife('hours');
  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Bring Your Event to Life</h1>
        <p className="text-xs lg:text-base">
          Start by filling in the essential details of your event. Once you publish it, it will be visible to the
          public. Don&apos;t worry — you can always update or modify these details later!
        </p>
      </div>

      <Suspense fallback={<p>loading...</p>}>
        <CreateNewEventForm />
      </Suspense>
    </>
  );
}
