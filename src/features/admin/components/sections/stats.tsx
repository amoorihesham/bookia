import { Users } from 'lucide-react';
import { getUserCount } from '../../actions/queries';
import { StateCard } from '../state-card';

export const StatsSection = async () => {
  const { currentCount, percentageChange, totalCount } = await getUserCount();

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4 2xl:grid-cols-4 2xl:gap-5">
      <StateCard
        currentCount={currentCount}
        mainIcon={<Users className="size-12" />}
        percentageChange={percentageChange}
        totalCount={totalCount}
      />
    </div>
  );
};
