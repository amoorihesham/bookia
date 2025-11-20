'use client';
import React, { ComponentPropsWithoutRef, createContext } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { EventTable, UserTable } from '@/drizzle/schema';

type EventType = typeof EventTable.$inferSelect & { organizer: typeof UserTable.$inferSelect | null };

interface EventCardProps extends ComponentPropsWithoutRef<'div'> {
  event: EventType;
}

export const EventCardContext = createContext<EventType | null>(null);

export const EventCard: React.FC<EventCardProps> = ({ children, className, event, ...props }) => {
  return (
    <EventCardContext.Provider value={event}>
      <Card
        className={cn(
          'w-full bg-cover bg-no-repeat bg-center relative p-0 bg-blend-soft-light min-h-[400px] max-h-[500px] hover:border-chart-4 transition-all duration-300 group overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </EventCardContext.Provider>
  );
};
