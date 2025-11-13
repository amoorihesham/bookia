import { cacheLife } from 'next/cache';
import { cn } from '@/lib/utils';
import { EmptyComponent } from '@/components/shared';
import { EventCard } from './event-card';
import { GetEventsAction } from '../actions/query';
import { FindEventsFilterTerm } from '../types';

type PropsType = {
  term: FindEventsFilterTerm;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export async function EventsGrid({ term, className, children, ...props }: PropsType) {
  'use cache';
  cacheLife('seconds');
  const events = await GetEventsAction(term);

  if (events.length === 0) return <EmptyComponent />;
  if (children) return children;

  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6', className)}
      {...props}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}
