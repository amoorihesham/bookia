import { cn } from '@/lib/utils';
import { queryPlans } from '../db';
import PlanCard from './plan-card';

export default async function PlansGrid({ className }: { className?: string }) {
  const plans = await queryPlans();
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6', className)}>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
        />
      ))}
    </div>
  );
}
