'use client';

import { useContext } from 'react';
import { EventCardContext } from '../cards';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { deleteEventAction } from '../../actions/mutation';

export const DeleteEventButton = () => {
  const event = useContext(EventCardContext);

  const onClick = async () => {
    const { success, message, errors } = await deleteEventAction(event!.id);
    if (success) {
      toast.success(message);
      return;
    }
    toast.error(message, { description: errors?.[0] ?? errors });
  };

  return (
    <TooltipButton tooltip="Delete event">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="dark:hover:bg-chart-4/20 hover:bg-chart-4/20 rounded-full"
        onClick={onClick}
      >
        <Trash className="size-5" />
      </Button>
    </TooltipButton>
  );
};
