'use client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SubscriptionType } from '../../types';
import { TableActions } from './table-actions';
import { DatabaseUser } from '@/features/users/types';
import { PlanType } from '@/features/plans/types';
import { CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DataTableLabel } from '@/components/shared';

export const columns: ColumnDef<SubscriptionType & { user: DatabaseUser; plan: PlanType }>[] = [
  {
    header: 'ID',
    cell: ({ row }) => (
      <DataTableLabel
        className="text-muted-foreground"
        label={`...${row.original.id.slice(-5)}`}
      />
    ),
    size: 100,
  },
  {
    header: 'Username',
    cell: ({ row }) => (
      <DataTableLabel
        className="font-semibold"
        label={row.original.user.username}
      />
    ),
    size: 100,
  },
  {
    header: 'Subscription Plan',
    cell: ({ row }) => (
      <DataTableLabel
        className={`${row.original.plan.name === 'pro' ? 'text-chart-4' : ''} capitalize`}
        label={row.original.plan.name}
      />
    ),
    size: 100,
  },
  {
    header: 'Subscribed On',
    cell: ({ row }) => <DataTableLabel label={format(row.original.subscribed_on, 'yy-MM-dd HH:mm a')} />,
    size: 100,
  },
  {
    header: 'Status',
    cell: ({ row }) => {
      return (
        <p className="flex items-center justify-center">
          {row.original.is_active ? (
            <CheckCircle2
              className="text-chart-4"
              size={28}
            />
          ) : (
            <CheckCircle2
              className="text-destructive"
              size={28}
            />
          )}
        </p>
      );
    },
    size: 100,
  },
  {
    header: 'Created At',
    cell: ({ row }) => <DataTableLabel label={format(row.original.createdAt, 'yy-MM-dd HH:mm a')} />,
    size: 100,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <TableActions row={row} />;
    },
  },
];
