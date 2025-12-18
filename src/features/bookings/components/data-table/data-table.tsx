import { DataTable } from '@/components/shared';
import { columns } from './columns';
import { bookingTable, EventTable } from '@/drizzle/schema';

export const BookingsDataTable = ({
  data,
}: {
  data: (typeof bookingTable.$inferSelect & { event: typeof EventTable.$inferSelect })[];
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
};
