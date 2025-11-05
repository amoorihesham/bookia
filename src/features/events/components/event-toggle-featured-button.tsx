'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Flag, Loader2 } from 'lucide-react';
import { toggleEventFeaturedStatus } from '../actions/mutation';
import { toast } from 'sonner';
import { useTransition } from 'react';

export const EventToggleFeaturedButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  async function markEventFeatured() {
    startTransition(async () => {
      const result = await toggleEventFeaturedStatus(id);
      if (result.success) {
        toast.success(result.message);
        return;
      }
      toast.error(result.message);
    });
  }

  return (
    <Button
      disabled={isPending}
      className='w-full bg-transparent border-chart-4 border text-white hover:bg-chart-4/10'
      onClick={markEventFeatured}
    >
      {isPending ? <Loader2 className={cn('size-5 animate-spin')} /> : <Flag className={cn('size-5')} />}
    </Button>
  );
};
