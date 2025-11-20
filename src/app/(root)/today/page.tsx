import { Suspense } from 'react';
import {
  BookEventButton,
  CardActions,
  CardContent,
  CardDate,
  CardHeader,
  CardPopularityBadge,
  CardTitle,
  EventCard,
  EventsGridSkeleton,
  LoveEventButton,
} from '@/features/events/components';
import { GetEventsAction } from '@/features/events/actions/query';
import { Clock, MapPin, TicketCheck } from 'lucide-react';
import { format } from 'date-fns';
import { EmptyComponent } from '@/components/shared';

export default async function TodayPage() {
  const events = await GetEventsAction('today');
  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>What&apos;s Happening Today?</h1>
        <p className='text-xs lg:text-base'>
          Ready for some excitement? Browse all events taking place today and jump into the experiences happening around
          you!
        </p>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        {events.length ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                className='bg-[url(/card.jpg)]'
              >
                <CardHeader className='z-5'>
                  <CardActions className='z-6'>
                    <BookEventButton />
                    <LoveEventButton />
                  </CardActions>
                  <div className='absolute w-full flex items-start justify-between p-3 left-0 top-0'>
                    <CardPopularityBadge className='shadow-lg' />
                    <CardDate className='shadow-lg' />
                  </div>
                </CardHeader>
                <CardContent className='bg-linear-to-b from-foreground/30 to-transparent from-10% to-100% absolute top-0 left-0 inset-0 group-hover:from-chart-4/30 z-1 flex items-end'>
                  <div className='h-1/4 mt-auto px-4 p-3 bg-background/20 backdrop-blur-xs w-full space-y-1'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-lg font-bold' />
                      <span className='flex items-center gap-1'>
                        {event.tickets}
                        <TicketCheck className='text-chart-4/60' />
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <Clock className='size-4 text-chart-4/60' />
                        <span>{format(event.held_on, 'hh:mm a')}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MapPin className='size-4 text-chart-4/60' />
                        <span className='capitalize'>{event.place}</span>
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
