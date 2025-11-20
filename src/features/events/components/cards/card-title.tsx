'use client';

import { useContext } from 'react';
import { EventCardContext } from './event-card';

export const CardTitle = ({ ...props }: React.ComponentProps<'h2'>) => {
  const event = useContext(EventCardContext);
  return <h2 {...props}>{event?.name}</h2>;
};
