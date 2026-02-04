import { Suspense } from 'react';
import { TextAnimate } from '@/components/ui/text-animate';
import { EventsGridSkeleton } from '@/features/events/components';
import { StatsSection } from './_components/StatsSection';
import { StatsSkeleton } from './_components/StatsSkeleton';
import { EventsSection } from './_components/EventsSection';

export default async function MyEventsPage() {
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
          Events in numbers
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
          {`Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
          level up your next event.`}
        </TextAnimate>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsSection />
      </Suspense>
    </>
  );
}
