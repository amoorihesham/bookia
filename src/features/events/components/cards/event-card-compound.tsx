import { MapPin, TicketCheck } from 'lucide-react';
import { CardActions } from './card-actions';
import { CardContent } from './card-content';
import { CardDate } from './card-date';
import { CardHeader } from './card-header';
import { CardPopularityBadge } from './card-popularity';
import { CardTitle } from './card-title';
import { EventCard, EventType } from './event-card';
import { EventTime } from './event-time';

export const EventCardCompound = ({ event }: { event: EventType }) => {
  return (
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
            <EventTime />
            <div className="flex items-center gap-1">
              <MapPin className="text-chart-4/60 size-4" />
              <span className="capitalize">{event.place}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </EventCard>
  );
};
