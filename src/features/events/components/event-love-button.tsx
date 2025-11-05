'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLoveStore } from '@/store/love';
import { Heart } from 'lucide-react';

export const EventLoveButton = ({ id }: { id: string }) => {
  const { toggleLove, loves } = useLoveStore();
  const isLoved = loves.some((item) => item.id === id);
  return (
    <Button
      variant={'outline'}
      className={cn('w-full')}
      onClick={() => toggleLove({ id })}
    >
      <Heart className={cn('size-5', isLoved && 'fill-red-400 text-red-400')} />
    </Button>
  );
};
