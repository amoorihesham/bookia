'use client';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { BookAlert } from 'lucide-react';
import { useContext } from 'react';
import { EventCardContext } from '../cards';
import { bookEventTicket } from '../../actions/mutation';
import { toast } from 'sonner';

export const BookEventButton = () => {
  const event = useContext(EventCardContext);

  const onClick = async () => {
    const result = await bookEventTicket(event!.id, 1);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    window.location.href = result.data.ceckout_url;
  };

  return (
    <TooltipButton tooltip="Book a ticket">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="dark:hover:bg-chart-4/20 hover:bg-chart-4/20 rounded-full"
        onClick={onClick}
      >
        <BookAlert className="size-5" />
      </Button>
    </TooltipButton>
  );
};
