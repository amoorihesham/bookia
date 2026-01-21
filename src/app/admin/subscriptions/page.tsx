import { TableSkeleton } from '@/components/shared';
import { SubscriptionsDataTable } from '@/features/subscriptions/components/data-table';
import { Suspense } from 'react';

export default async function SubscriptionsPage() {
  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase">Subscriptions</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Here you can manage the current subscriptions available in your site.
          </p>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <SubscriptionsDataTable />
      </Suspense>
    </div>
  );
}
