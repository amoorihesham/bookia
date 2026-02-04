import { CreateNewEventForm } from '@/features/events/components';
import { TextAnimate } from '@/components/ui/text-animate';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

export default async function NewEventPage() {
  'use cache';
  cacheLife('weeks');
  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-center text-2xl font-semibold lg:text-5xl"
          animation="blurInDown"
          as="h1"
          duration={0.6}
          by="word"
          once
        >
          Bring Your Event to Life
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          duration={0.2}
          delay={0.8}
          as={'p'}
          by="line"
          once
        >
          {`Start by filling in the essential details of your event. Once you publish it, it will be visible to the
          public. Don't worry — you can always update or modify these details later!`}
        </TextAnimate>
      </div>

      <Suspense fallback={<p>loading...</p>}>
        <CreateNewEventForm />
      </Suspense>
    </>
  );
}
