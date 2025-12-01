import { Suspense } from 'react';
import { GetEventsAction } from '@/features/events/actions/query';
import {
  CardActions,
  EventCard,
  EventsGridSkeleton,
  CardHeader,
  CardPopularityBadge,
  CardDate,
  CardContent,
  CardTitle,
} from '@/features/events/components';
import { EmptyComponent } from '@/components/shared';
import { format } from 'date-fns';
import { Clock, MapPin, TicketCheck } from 'lucide-react';
import { ToggleFeaturedButton } from '@/features/events/components/buttons/featured-event-button';
import { DeleteEventButton } from '@/features/events/components/buttons/delete-event-button';

export default async function ExpiredPage() {
  const events = await GetEventsAction('expired');

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Past Events That Made Memories</h1>
        <p className="text-xs lg:text-base">
          Missed an event? Don&apos;t worry — here&apos;s a look back at all the past experiences that have already
          taken place. Relive the moments and get inspired for what&apos;s coming next!
        </p>
      </div>

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
                  <CardActions className="z-6">
                    {user => {
                      if (!user) return null;

                      return (
                        event.user_id === user.clerk_id && (
                          <>
                            <ToggleFeaturedButton />
                            <DeleteEventButton />
                          </>
                        )
                      );
                    }}
                  </CardActions>
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
