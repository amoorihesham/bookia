'use client';

import { TooltipButton } from '@/components/buttons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLoveStore } from '@/store/love';
import { Heart } from 'lucide-react';
import { EventCardContext } from '../cards';
import { useContext } from 'react';

export const LoveEventButton = () => {
  const event = useContext(EventCardContext);
  const { toggleLove, loves } = useLoveStore();

  const isLoved = loves.some((item) => item.id === event?.id);
  return (
    <TooltipButton tooltip="Love event">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="dark:hover:bg-chart-4/20 hover:bg-chart-4/20 rounded-full"
        onClick={() => toggleLove({ id: event!.id! })}
      >
        <Heart
          className={cn('size-5', isLoved && 'fill-red-400 text-red-400')}
        />
      </Button>
    </TooltipButton>
  );
};
