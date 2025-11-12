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

type Props = { event: typeof EventTable.$inferSelect & { organizer: typeof UserTable.$inferSelect | null } };

export const EventCard = ({
  event: { id, name, organizer, featured, open, tickets, held_on, place, guests, ticket_price },
}: Props) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>By {organizer?.username}</CardDescription>
        <CardAction className='gap-2 flex items-center'>
          {featured && <Badge className='bg-chart-4 text-foreground'>Featured</Badge>}
          {open ? (
            <Badge className='bg-chart-2 text-foreground'>open</Badge>
          ) : (
            <Badge className='bg-destructive text-foreground'>closed</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className='flex justify-between'>
        <div>
          <p>
            Available Tickets: <span className='font-semibold text-chart-2'>{tickets}</span>
          </p>
          <p className='flex items-center gap-2'>
            On:
            <span className={cn('font-semibold text-chart-2', !open && 'text-destructive')}>
              {format(held_on, 'd-MMM-yyyy')}
            </span>
            At:
            <span className='text-muted-foreground underline '>{format(held_on, 'hh:mm a')}</span>
          </p>
          <p>
            Place: <span className='font-semibold text-chart-2'>{place}</span>
          </p>
          {guests?.length && (
            <div className='flex items-center gap-2 mt-3 flex-wrap'>
              {guests.map((guest) => (
                <p
                  key={guest}
                  className={cn('underline cursor-pointer text-muted-foreground')}
                >
                  @{guest}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className={cn('font-bold text-4xl text-chart-4', !open && 'line-through')}>
            {formateCurrecny(ticket_price)}
          </h3>
        </div>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        {!featured && <EventToggleFeaturedButton id={id} />}

        <EventLoveButton id={id} />
        <EventBookButton
          id={id}
          open={open!}
        />
      </CardFooter>
    </Card>
  );
};
