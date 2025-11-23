'use client';

import { useContext } from 'react';
import { EventCardContext } from './event-card';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const CardDate = ({ className }: React.ComponentProps<'div'>) => {
  const event = useContext(EventCardContext);
  return (
    <div
      className={cn(
        'bg-foreground/10 text-foreground flex flex-col items-center rounded-sm p-3 backdrop-blur-sm',
        className
      )}
    >
      <span className="text-lg font-semibold">{format(event!.held_on, 'dd')}</span>
      <span className="text-chart-4 uppercase">{format(event!.held_on, 'MMM')}</span>
    </div>
  );
};
