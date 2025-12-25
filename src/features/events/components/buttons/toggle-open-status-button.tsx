'use client';

import { useContext } from 'react';
import { EventCardContext } from '../cards';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { DoorClosed, DoorOpen } from 'lucide-react';
import { toggleEventOpenStatusAction } from '../../actions/mutation';
import { toast } from 'sonner';

export const ToggleOpenStatusButton = () => {
  const event = useContext(EventCardContext);

  const onClick = async () => {
    const { success, message, errors } = await toggleEventOpenStatusAction(event!.id!);
    if (!success) return toast.error(message, { description: errors?.[0] ?? errors });
    toast.success(message);
  };

  return (
    <TooltipButton tooltip="Toggle open status">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="dark:hover:bg-chart-4/20 hover:bg-chart-4/20 rounded-full"
        onClick={onClick}
      >
        {event?.open ? <DoorOpen className="size-5" /> : <DoorClosed className="size-5" />}
      </Button>
    </TooltipButton>
  );
};
