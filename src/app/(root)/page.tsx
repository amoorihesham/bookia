import { Suspense } from 'react';

import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetHomepageFeaturedEvents, GetHomepageRegularEvents } from '@/features/events/actions/query';

export default async function Homepage() {
  const [featuredEvents, regularEvents] = await Promise.all([GetHomepageFeaturedEvents(), GetHomepageRegularEvents()]);
  console.log('FEATUED_EVENTS', featuredEvents);
  console.log('REGULAR_EVENTS', regularEvents);

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Discover All Events Around You</h1>
        <p className="text-xs lg:text-base">
          Get ready for an adventure! Browse all events happening near you — from today&apos;s highlights to upcoming
          experiences — and find your next unforgettable moment.
        </p>
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
