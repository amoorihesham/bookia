'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { upgradePlane } from '../../actions/mutations';
import { toast } from 'sonner';

export const UpgradePlanButton = ({
  className,
  children,
  planName,
  ...props
}: React.ComponentProps<'button'> & { planName: 'basic' | 'free' | 'ultimate' }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      const result = await upgradePlane(planName);
      if (result.success && 'url' in result) {
        window.location.href = result.url!;
        return;
      }
      if (!result.success && 'message' in result) {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      {...props}
      className={cn('w-full', className)}
      onClick={onClick}
    >
      {children ? children : 'Get Started'}
    </Button>
  );
};
