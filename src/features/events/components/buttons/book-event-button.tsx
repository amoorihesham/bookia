'use client';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { BookAlert } from 'lucide-react';
import { useContext } from 'react';
import { EventCardContext } from '../cards';

export const BookEventButton = () => {
  const event = useContext(EventCardContext);
  return (
    <TooltipButton tooltip='Book a ticket'>
      <Button
        variant={'ghost'}
        size={'icon'}
        className='rounded-full dark:hover:bg-chart-4/20 hover:bg-chart-4/20'
      >
        <BookAlert className='size-5' />
      </Button>
    </TooltipButton>
  );
};
