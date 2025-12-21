import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/shared/lib/auth';
import { ToggleFeaturedButton } from '../buttons/featured-event-button';
import { DeleteEventButton } from '../buttons/delete-event-button';
import { BookEventButton } from '../buttons/book-event-button';
import { LoveEventButton } from '../buttons/event-love-button';
import { ToggleOpenStatusButton } from '../buttons/toggle-open-status-button';

type CardActionsProps = {
  className?: string;
  eventOwnerId: string;
};

export const CardActions = async ({ className, eventOwnerId }: CardActionsProps) => {
  const user = await getCurrentUser();

  if (!user) return null;
  return (
    <div
      className={cn(
        'bg-background/30 border-chart-4/20 absolute -top-full left-1/2 flex w-40 -translate-x-1/2 items-center justify-center gap-2 rounded-full border px-3 py-1 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:top-3',
        className
      )}
    >
      {user.clerk_id === eventOwnerId ? (
        <>
          <ToggleOpenStatusButton userId={user.clerk_id} />
          <ToggleFeaturedButton userId={user.clerk_id} />
          <DeleteEventButton userId={user.clerk_id} />
        </>
      ) : (
        <>
          <BookEventButton />
          <LoveEventButton />
        </>
      )}
    </div>
  );
};
