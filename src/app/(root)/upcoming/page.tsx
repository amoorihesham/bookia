import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetUpcomingpageEvents } from '@/features/events/actions/query';
import { TextAnimate } from '@/components/ui/text-animate';

export default async function UpcomingPage() {
  const events = await GetUpcomingpageEvents();

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
          Upcoming Events to Look Forward To
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
          {`Get ready for what's next! Explore all the exciting events\ncoming up and plan your experiences ahead of time — don&apos;t miss out on the fun!`}
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
