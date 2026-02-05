import { Suspense } from 'react';
import { EventsGridSkeleton, EventCardCompound } from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { GetHomepageFeaturedEvents, GetHomepageRegularEvents } from '@/features/events/actions/query';
import { TextAnimate } from '@/components/ui/text-animate';
import { BlurFade } from '@/components/ui/blur-fade';

export default async function Homepage() {
  const [featuredEvents, regularEvents] = await Promise.all([GetHomepageFeaturedEvents(), GetHomepageRegularEvents()]);

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-foreground text-2xl font-semibold uppercase underline underline-offset-4"
          animation="blurInDown"
          as="h2"
          duration={0.4}
          delay={0.6}
          by="word"
          once
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
          once
        >
          {`Get ready for an adventure! Browse all events happening near you\n— from today's highlights to upcoming experiences.`}
        </TextAnimate>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <TextAnimate
            className="text-foreground text-2xl font-semibold uppercase underline underline-offset-4"
            animation="blurInDown"
            as="h2"
            duration={0.4}
            delay={0.6}
            by="word"
            once
          >
            Featured Events
          </TextAnimate>

          <Suspense fallback={<EventsGridSkeleton />}>
            {featuredEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {featuredEvents.map((event, idx) => (
                  <BlurFade
                    key={event.id}
                    delay={0.6 + idx * 0.4}
                    inView
                  >
                    <EventCardCompound event={event} />
                  </BlurFade>
                ))}
              </div>
            ) : (
              <EmptyComponent />
            )}
          </Suspense>
        </div>
        <div className="space-y-4">
          <TextAnimate
            className="text-foreground text-2xl font-semibold uppercase underline underline-offset-4"
            animation="blurInDown"
            as="h2"
            duration={0.4}
            delay={0.6}
            by="word"
            once
          >
            Regular Events
          </TextAnimate>

          <Suspense fallback={<EventsGridSkeleton />}>
            {regularEvents.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {regularEvents.map((event, idx) => (
                  <BlurFade
                    key={event.id}
                    delay={0.6 + idx * 0.4}
                    inView
                  >
                    <EventCardCompound event={event} />
                  </BlurFade>
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
