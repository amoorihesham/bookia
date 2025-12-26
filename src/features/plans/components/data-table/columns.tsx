'use client';
import { PlanTable } from '@/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TableAction } from './table-actions';

export const columns: ColumnDef<typeof PlanTable.$inferSelect>[] = [
  {
    header: 'ID',
    cell: ({ row }) => {
      const parts = row.original.id.split('-');
      return (
        <p className="text-primary text-lg font-semibold uppercase">
          {parts[0]}...{parts[parts.length - 1]}
        </p>
      );
    },
    size: 100,
  },

  {
    header: 'Name',
    cell: ({ row }) => <p className="text-primary text-lg font-semibold uppercase">{row.original.name}</p>,
    size: 100,
  },
  {
    header: 'Price',
    cell: ({ row }) => <p className="text-chart-4 text-lg font-semibold">{row.original.price}$</p>,
    size: 100,
  },
  {
    header: 'Stripe_Price_Id',
    cell: ({ row }) => (
      <p className="text-muted-foreground text-lg font-semibold">{row.original.stripe_price_id ?? 'none'}</p>
    ),
    size: 100,
  },
  {
    header: 'Created At',
    accessorFn: row => format(row.createdAt, 'yyyy-MM-dd HH:mm:ss a'),
    size: 100,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <TableAction row={row} />;
    },
  },
];
