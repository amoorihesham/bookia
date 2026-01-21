'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { DatabaseUser } from '@/features/users/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TableAction } from './table-actions';
import { DataTableLabel } from '@/components/shared';

export const columns: ColumnDef<DatabaseUser>[] = [
  {
    header: 'Clerk_ID',
    cell: ({ row }) => {
      const parts = row.original.clerk_id.split('_');
      return <DataTableLabel label={`${parts[0]}_...${parts[1].slice(-3)}`} />;
    },
    size: 100,
  },

  {
    header: 'username',
    cell: ({ row }) => (
      <DataTableLabel
        className="font-medium"
        label={row.original.username}
      />
    ),
    size: 100,
  },
  {
    header: 'Email',
    cell: ({ row }) => (
      <DataTableLabel
        className="normal-case"
        label={row.original.email}
      />
    ),
    size: 100,
  },
  {
    header: 'Login Method',
    cell: ({ row }) => <DataTableLabel label={row.original.method} />,
    size: 100,
  },
  {
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar className="mx-auto rounded-md">
        <AvatarImage src={row.original.image} />
      </Avatar>
    ),
    size: 100,
  },
  {
    header: 'Role',
    cell: ({ row }) => (
      <DataTableLabel
        className={cn('text-center uppercase', row.original.role === 'admin' && 'text-chart-4')}
        label={row.original.role}
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
