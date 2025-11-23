import { CreateNewPlanDialog } from '@/features/plans/components/create-new-plan-dialog';
import PlansGrid from '@/features/plans/components/plans-grid';
import PlansGridSkeleton from '@/features/plans/components/plans.grid.skeleton';
import { Suspense } from 'react';

export default function PlansPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase">Plans</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Here you can manage the current plans available in your site.
          </p>
        </div>
        <CreateNewPlanDialog />
      </div>
      <Suspense fallback={<PlansGridSkeleton />}>
        <PlansGrid className="mt-10 justify-items-center" />
      </Suspense>
    </div>
  );
}
