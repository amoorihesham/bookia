import { ArrowDown, ArrowUp, Equal } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  totalCount: number;
  currentCount: number;
  percentageChange: number;
  mainIcon: ReactNode;
  upIcon?: ReactNode;
  downIcon?: ReactNode;
  equalIcon?: ReactNode;
  prevCount?: number;
};

export const StateCard = ({ totalCount, currentCount, percentageChange, mainIcon }: Props) => {
  return (
    <div className="bg-muted/20 hover:bg-muted/50 flex items-start justify-between rounded-sm border p-4 shadow-white/10 transition-colors duration-300 hover:shadow-md">
      <div className="flex flex-col items-center justify-center gap-2">
        {mainIcon}
        <h3 className="text-chart-4 text-4xl font-bold">{totalCount}</h3>
      </div>
      <div className="space-y-2">
        <p className="flex flex-col justify-start text-3xl font-medium">
          <span className="text-xs font-thin text-gray-300 capitalize">this month</span>
          {currentCount}
        </p>
        <div className="flex flex-col justify-start">
          <span className="text-xs font-thin text-gray-300 capitalize">previous month</span>
          <p className={`flex items-center gap-1 text-sm ${percentageChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentageChange > 0 ? (
              <ArrowUp className="size-4" />
            ) : percentageChange === 0 ? (
              <Equal className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}{' '}
            {percentageChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};
