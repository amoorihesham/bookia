import { EmptyComponent } from '@/components/shared';
import { GetUserEventsAction } from '@/features/events/actions/query';
import { EventCardCompound } from '@/features/events/components';
import { getCurrentUser } from '@/shared/lib/auth';

export const EventsSection = async () => {
  const user = await getCurrentUser();
  const events = await GetUserEventsAction(user!);

  return events.length ? (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
      {events.map(event => (
        <EventCardCompound
          event={event}
          key={event.id}
        />
      ))}
    </div>
  ) : (
    <EmptyComponent />
  );
};
