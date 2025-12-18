'use client';
import { Clock } from 'lucide-react';
import { useContext } from 'react';
import { EventCardContext } from './event-card';
import { format } from 'date-fns';

export const EventTime = () => {
  const event = useContext(EventCardContext);
  return (
    <div className="flex items-center gap-1">
      <Clock className="text-chart-4/60 size-4" />
      <span>{format(new Date(event!.held_on), 'dd MMM, HH:mma')}</span>
    </div>
  );
};
