import { Suspense } from 'react';
import { TableSkeleton } from '@/components/shared';
import { PlansDataTable } from '@/features/plans/components/data-table';
import { CreateNewPlanDialog } from '@/features/plans/components/dialogs';

export default function PlansPage() {
  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase">Plans</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Here you can manage the current plans available in your site.
          </p>
        </div>
        <CreateNewPlanDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <PlansDataTable />
      </Suspense>
    </div>
  );
}
