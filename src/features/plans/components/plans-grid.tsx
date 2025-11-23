import { cn } from '@/lib/utils';
import PlanCard from './plan-card';
import { getAllPlansAction } from '../actions/query';

export default async function PlansGrid({ className }: { className?: string }) {
  const plans = await getAllPlansAction();

  return (
    <div className={cn('mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6', className)}>
      {plans.map(plan => (
        <PlanCard
          key={plan.id}
          {...plan}
        />
      ))}
    </div>
  );
}
