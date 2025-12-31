import { TableSkeleton } from '@/components/shared';
import { UsersDataTable } from '@/features/users/componnets/admin/data-table';
import { Suspense } from 'react';

export default async function Userspage() {
  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase">Users</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Here you can manage the current users available in your site.
          </p>
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <UsersDataTable />
      </Suspense>
    </div>
  );
}
