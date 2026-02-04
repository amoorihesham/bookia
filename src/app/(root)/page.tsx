import { Suspense } from 'react';

import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetHomepageFeaturedEvents, GetHomepageRegularEvents } from '@/features/events/actions/query';
import { TextAnimate } from '@/components/ui/text-animate';

export default async function Homepage() {
  const [featuredEvents, regularEvents] = await Promise.all([GetHomepageFeaturedEvents(), GetHomepageRegularEvents()]);

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-center text-2xl font-semibold lg:text-5xl"
          animation="blurInDown"
          as="h1"
          duration={0.6}
          by="word"
        >
          Discover All Events Around You
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          duration={0.2}
          delay={0.8}
          as={'p'}
          by="line"
        >
          {`Get ready for an adventure! Browse all events happening near you\n— from today's highlights to upcoming experiences.`}
        </TextAnimate>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold uppercase underline underline-offset-4">
            Featured Events
          </h2>
          <Suspense fallback={<EventsGridSkeleton />}>
            {featuredEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {featuredEvents.map(event => (
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
        </div>
        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold uppercase underline underline-offset-4">
            Regular Events
          </h2>
          <Suspense fallback={<EventsGridSkeleton />}>
            {regularEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {regularEvents.map(event => (
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
        </div>
      </div>
    </>
  );
}
