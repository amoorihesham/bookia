import { EventTable, UserTable } from '@/drizzle/schema';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formateCurrecny } from '@/shared/lib/formaters';
import { cn } from '@/lib/utils';
import { EventLoveButton } from './event-love-button';
import { EventBookButton } from './event-book-button';
import { EventToggleFeaturedButton } from './event-toggle-featured-button';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { BookAlert, Clock, Locate, MapPin, Ticket, TicketCheck } from 'lucide-react';
import { TooltipButton } from '@/components/buttons';

type Props = { event: typeof EventTable.$inferSelect & { organizer: typeof UserTable.$inferSelect | null } };

export const EventCard = ({
  event: { id, name, organizer, featured, open, tickets, held_on, place, guests, ticket_price },
}: Props) => {
  return (
    <Card className='w-full bg-[url(/card.jpg)] bg-cover bg-no-repeat bg-center relative p-0 bg-blend-soft-light min-h-[400px] max-h-[500px] hover:border-chart-4 transition-all duration-300 group overflow-hidden'>
      <CardActions className='z-5'>
        <TooltipButton tooltip='Book a ticket'>
          <Button
            variant={'ghost'}
            size={'icon'}
            className='rounded-full dark:hover:bg-chart-4/20 hover:bg-chart-4/20'
          >
            <BookAlert />
          </Button>
        </TooltipButton>
      </CardActions>
      <div className='absolute w-full flex items-start justify-between p-3 left-0 top-0'>
        <div className=''>
          {featured ? (
            <Badge className='bg-chart-4 text-foreground'>Featured</Badge>
          ) : (
            <Badge className='bg-chart-1 text-foreground'>Regular</Badge>
          )}
        </div>
        <div className='bg-foreground/10 backdrop-blur-sm rounded-sm p-3 text-foreground flex flex-col items-center'>
          <span className='font-semibold text-lg'>{format(held_on, 'dd')}</span>
          <span className='text-chart-4 uppercase'>{format(held_on, 'MMM')}</span>
        </div>
      </div>
      <div className='h-full flex items-end bg-linear-to-b from-foreground/30 group-hover:from-chart-4/30 transition-all duration-500 to-transparent from-10% to-100% overflow-hidden'>
        <div className='mt-auto h-1/5 bg-background/10 backdrop-blur-xs w-full p-3'>
          <CardTitle className='flex items-center justify-between'>
            {name}
            <span className='flex items-center gap-1'>
              {tickets}
              <TicketCheck className='text-chart-4/60' />
            </span>
          </CardTitle>
          <CardDescription className='mt-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <Clock className='size-4 text-chart-4/60' />
                <span>{format(held_on, 'hh:mm a')}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MapPin className='size-4 text-chart-4/60' />
                <span className='capitalize'>{place}</span>
              </div>
            </div>
          </CardDescription>
        </div>
      </div>
    </Card>
  );
};

const CardActions = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div
      className={cn(
        'absolute w-40 flex items-center gap-2 justify-center transition-all duration-300 -top-full group-hover:top-3 left-1/2 -translate-x-1/2 bg-background/60 border-chart-4/20 shadow-xl border backdrop-blur-sm rounded-full px-3 py-1',
        className
      )}
    >
      {children}
    </div>
  );
};
