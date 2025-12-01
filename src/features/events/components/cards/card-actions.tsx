import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/shared/lib/auth';
import { UserTable } from '@/drizzle/schema';

type CardActionsProps = {
  className?: string;
  children: (owner: typeof UserTable.$inferSelect) => ReactNode;
};

export const CardActions = async ({ className, children }: CardActionsProps) => {
  const user = await getCurrentUser();
  return (
    <div
      className={cn(
        'bg-background/30 border-chart-4/20 absolute -top-full left-1/2 flex w-40 -translate-x-1/2 items-center justify-center gap-2 rounded-full border px-3 py-1 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:top-3',
        className
      )}
    >
      {children(user!)}
    </div>
  );
};
