'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TicketPercent } from 'lucide-react';

export const EventBookButton = ({ id }: { id: string }) => {
  return (
    <Button className='w-full'>
      <TicketPercent className={cn('size-5')} />
    </Button>
  );
};
