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
    const { success, message, errors, data } = await bookEventTicket(event!.id);
    if (!success) {
      toast.error(message, { description: errors?.[0] ?? errors });
      return;
    }
    window.location.href = data!.checkout_url;
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
