import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { GetTodaypageEvents } from '@/features/events/actions/query';
import { EmptyComponent } from '@/components/shared';
import { TextAnimate } from '@/components/ui/text-animate';

export default async function TodayPage() {
  const events = await GetTodaypageEvents();
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
          What&apos;s Happening Today?
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          delay={0.2}
          as={'p'}
          by="line"
          once
        >
          {`Ready for some excitement?\nBrowse all events taking place today and jump into the experiences!`}
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
