'use client';

import { useContext } from 'react';
import { EventCardContext } from '../cards';
import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { Feather } from 'lucide-react';
import { toast } from 'sonner';
import { toggleEventFeaturedStatus } from '../../actions/mutation';

export const ToggleFeaturedButton = () => {
  const event = useContext(EventCardContext);

  const onClick = async () => {
    const { success, message, errors } = await toggleEventFeaturedStatus(event!.id);
    if (success) {
      toast.success(message);
      return;
    }
    toast.error(message, { description: errors?.[0] ?? errors });
  };

  return (
    <TooltipButton tooltip="Toggle featured status">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="dark:hover:bg-chart-4/20 hover:bg-chart-4/20 rounded-full"
        onClick={onClick}
      >
        <Feather className="size-5" />
      </Button>
    </TooltipButton>
  );
};
