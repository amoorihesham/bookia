import { Suspense } from 'react';
import { GetExpiredpageEvents } from '@/features/events/actions/query';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { TextAnimate } from '@/components/ui/text-animate';

export default async function ExpiredPage() {
  const events = await GetExpiredpageEvents();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-center text-2xl font-semibold lg:text-5xl"
          animation="blurInDown"
          as="h1"
          by="word"
          once
        >
          Past Events That Made Memories
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          delay={0.2}
          as={'p'}
          by="line"
          once
        >
          {`Missed an event? Don't worry — here's\na look back at all the past experiences that have already\n
          taken place. Relive the moments and get inspired for what's coming next!`}
        </TextAnimate>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        {events.length ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {events.map(event => (
              <EventCardCompound
                event={event}
                key={event.id}
              />
            ))}
          </div>
        ) : (
          <EmptyComponent />
        )}
      </Suspense>
    </>
  );
}
