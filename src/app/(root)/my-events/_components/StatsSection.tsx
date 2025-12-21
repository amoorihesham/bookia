import { GetUserEventStatsAction } from '@/features/events/actions/query';
import { getCurrentUser } from '@/shared/lib/auth';

export const StatsSection = async () => {
  const user = await getCurrentUser();
  const { count, open_count, featured_count, close_count } = await GetUserEventStatsAction(user!);
  console.log({ count, open_count, featured_count, close_count });

  return (
    <div className="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
        <div className="text-3xl font-bold lg:text-5xl">+{count}</div>
        <p className="text-sm lg:text-base">Total Events</p>
      </div>
      <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
        <div className="text-3xl font-bold lg:text-5xl">{featured_count}</div>
        <p className="text-sm lg:text-base">Featured Events</p>
      </div>
      <div className="flex flex-col items-center space-y-0 border-b pb-4 lg:space-y-4 lg:border-r lg:border-b-0 lg:py-4">
        <div className="text-3xl font-bold lg:text-5xl">{open_count}</div>
        <p className="text-sm lg:text-base">Open Events</p>
      </div>
      <div className="flex flex-col items-center space-y-0 pb-4 lg:space-y-4 lg:py-4">
        <div className="text-3xl font-bold lg:text-5xl">{close_count}</div>
        <p className="text-sm lg:text-base">Closed Events</p>
      </div>
    </div>
  );
};
