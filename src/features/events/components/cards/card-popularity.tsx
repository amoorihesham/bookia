'use client';

import { useContext } from 'react';
import { EventCardContext } from './event-card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const CardPopularityBadge = ({ className, ...props }: React.ComponentProps<'span'>) => {
  const event = useContext(EventCardContext);

  return (
    <div className="flex flex-col gap-2">
      {event?.featured ? (
        <Badge
          className={cn('bg-chart-4 text-foreground', className)}
          {...props}
        >
          Featured
        </Badge>
      ) : (
        <Badge className="bg-chart-1 text-foreground">Regular</Badge>
      )}
      {!event?.open && (
        <Badge
          className={cn('bg-destructive text-foreground', className)}
          {...props}
        >
          Closed
        </Badge>
      )}
    </div>
  );
};
