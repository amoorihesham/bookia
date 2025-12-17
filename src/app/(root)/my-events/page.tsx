import {
  CardActions,
  CardContent,
  CardDate,
  CardHeader,
  CardPopularityBadge,
  CardTitle,
  EventCard,
  EventsGridSkeleton,
} from '@/features/events/components';
import { GetUserEventsAction } from '@/features/events/actions/query';
import { EmptyComponent } from '@/components/shared';
import { Suspense } from 'react';
import { Clock, MapPin, TicketCheck } from 'lucide-react';
import { format } from 'date-fns';

export default async function StatsSection() {
  const { events, count, close_count, featured_count, open_count } = await GetUserEventsAction();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Events in numbers</h1>
        <p className="text-xs lg:text-base">
          Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
          level up your next event.
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        <div className="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
            <div className="text-3xl font-bold lg:text-5xl">+{count}</div>
            <p className="text-sm lg:text-base">Total Events</p>
          </div>
          <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
            <div className="text-3xl font-bold lg:text-5xl">{featured_count}</div>
            <p className="text-sm lg:text-base">Featured Events</p>
          </div>
          <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
            <div className="text-3xl font-bold lg:text-5xl">{open_count}</div>
            <p className="text-sm lg:text-base">Open Events</p>
          </div>
          <div className="flex flex-col items-center space-y-0 pb-4 lg:space-y-4 lg:py-4">
            <div className="text-3xl font-bold lg:text-5xl">{close_count}</div>
            <p className="text-sm lg:text-base">Closed Events</p>
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<EventsGridSkeleton />}>
        {events.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                style={{ backgroundImage: `url(${event.cover_thumbnail})` }}
              >
                <CardHeader className="z-5">
                  <CardActions
                    className="z-6"
                    eventOwnerId={event.user_id!}
                  />

                  <div className="absolute top-0 left-0 flex w-full items-start justify-between p-3">
                    <CardPopularityBadge className="shadow-lg" />
                    <CardDate className="shadow-lg" />
                  </div>
                </CardHeader>
                <CardContent className="from-foreground/30 group-hover:from-chart-4/30 absolute inset-0 top-0 left-0 z-1 flex items-end bg-linear-to-b from-10% to-transparent to-100%">
                  <div className="bg-background/20 mt-auto h-1/4 w-full space-y-1 p-3 px-4 backdrop-blur-xs">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold" />
                      <span className="flex items-center gap-1">
                        {event.tickets}
                        <TicketCheck className="text-chart-4/60" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="text-chart-4/60 size-4" />
                        <span>{format(event.held_on, 'hh:mm a')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="text-chart-4/60 size-4" />
                        <span className="capitalize">{event.place}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </EventCard>
            ))}
          </div>
        ) : (
          <EmptyComponent />
        )}
      </Suspense>
    </>
  );
}
