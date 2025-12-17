import { DataTable } from '@/components/shared';
import { columns } from './columns';
import { bookingTable } from '@/drizzle/schema';

export const BookingsDataTable = ({ data }: { data: (typeof bookingTable.$inferSelect)[] }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
};
