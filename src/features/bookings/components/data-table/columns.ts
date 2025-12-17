import { bookingTable } from '@/drizzle/schema';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<typeof bookingTable.$inferSelect>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'event_id',
    header: 'Event ID',
  },
  {
    accessorKey: 'user_id',
    header: 'User ID',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
  },
];
