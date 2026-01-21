'use client';
import { PlanTable } from '@/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TableAction } from './table-actions';
import { DataTableLabel } from '@/components/shared';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<typeof PlanTable.$inferSelect>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <DataTableLabel label={`...${row.original.id.slice(-5)}`} />,
    size: 100,
  },

  {
    header: 'Name',
    cell: ({ row }) => (
      <DataTableLabel
        className={cn('font-semibold capitalize', row.original.name === 'pro' && 'text-chart-4')}
        label={row.original.name}
      />
    ),
    size: 100,
  },
  {
    header: 'Price',
    cell: ({ row }) => <DataTableLabel label={`${row.original.price}$`} />,
    size: 100,
  },
  {
    header: 'Stripe_Price_Id',
    cell: ({ row }) => (
      <DataTableLabel
        label={
          row.original.stripe_price_id
            ? `${row.original.stripe_price_id?.split('_')[0]}...${row.original.stripe_price_id.split('_')[1].slice(-5)}`
            : 'none'
        }
      />
    ),
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
      return <TableAction row={row} />;
    },
  },
];
