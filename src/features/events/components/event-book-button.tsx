'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TicketPercent } from 'lucide-react';

export const EventBookButton = ({ id, open }: { id: string; open: boolean }) => {
  return (
    <Button
      className='w-full'
      disabled={!open}
    >
      <TicketPercent className={cn('size-5')} />
    </Button>
  );
};
