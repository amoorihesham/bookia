'use client';
import { bookingTable, EventTable } from '@/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clipboard, MoreHorizontal, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<typeof bookingTable.$inferSelect & { event: typeof EventTable.$inferSelect }>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    accessorFn: row => {
      return `.....${row.id.split('-')[row.id.split('-').length - 1].slice(-6)}`;
    },
  },
  {
    accessorKey: 'event.user_id',
    header: 'Seller ID',
  },
  {
    accessorKey: 'event.name',
    header: 'Event Name',
  },
  {
    accessorKey: 'event.held_on',
    header: 'Event Date',
    accessorFn: row => {
      return format(row.event.held_on, 'dd MMM, HH:mma');
    },
  },
  {
    accessorKey: 'event.open',
    header: 'Event Status',
    cell: ({ row }) => (
      <Badge className={row.original.event.open ? 'bg-chart-4 text-white' : 'bg-destructive text-white'}>
        {row.original.event.open ? 'Open' : 'Closed'}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    accessorFn: row => {
      return format(row.createdAt, 'yyyy-MM-dd HH:mm:ss');
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await navigator.clipboard.writeText(String(row.original.id));
                toast.info('Booking ID copied to clipboard');
              }}
            >
              <Clipboard />
              Copy Booking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
            >
              <StopCircle />
              Cancel Booking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
