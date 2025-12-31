'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DatabaseUser } from '@/features/users/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<DatabaseUser>[] = [
  {
    header: 'Clerk_ID',
    accessorFn: row => {
      const parts = row.clerk_id.split('_');
      return `${parts[0]}_${parts[1].slice(-3)}`;
    },
    size: 100,
  },

  {
    header: 'username',
    accessorFn: row => row.username,
    size: 100,
  },
  {
    header: 'Email',
    accessorFn: row => row.email,
    size: 100,
  },
  {
    header: 'Login Method',
    accessorFn: row => row.method,
    size: 100,
  },
  {
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar className="rounded-md">
        <AvatarImage src={row.original.image} />
      </Avatar>
    ),

    size: 100,
  },
  {
    header: 'Role',
    accessorFn: row => row.role,
    size: 100,
  },

  {
    header: 'Created At',
    accessorFn: row => format(row.createdAt, 'yyyy-MM-dd HH:mm:ss a'),
    size: 100,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     return <TableAction row={row} />;
  //   },
  // },
];
