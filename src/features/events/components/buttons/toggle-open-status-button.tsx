'use client';

import { useContext } from 'react';
import { EventCardContext } from '../cards';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { DoorClosed, DoorOpen, FolderClosed, FolderOpenDot } from 'lucide-react';
import { toggleEventOpenStatusAction } from '../../actions/mutation';
import { toast } from 'sonner';

export const ToggleOpenStatusButton = ({ userId }: { userId: string }) => {
  const event = useContext(EventCardContext);

  const onClick = async () => {
    const { success, message } = await toggleEventOpenStatusAction(event?.id!, !event?.open, userId);
    if (!success) return toast.error(message);
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
