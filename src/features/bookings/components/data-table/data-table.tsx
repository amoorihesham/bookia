import { DataTable, EmptyComponent } from '@/components/shared';
import { columns } from './columns';
import { GetUserBookingsAction, GetUserBookingsAsOrdersAction } from '../../actions/query';
import { getCurrentUser } from '@/shared/lib/auth';

export const BookingsDataTable = async () => {
  const user = await getCurrentUser();
  const orders = await GetUserBookingsAction(user!);

  return orders.length ? (
    <DataTable
      columns={columns}
      data={orders}
    />
  ) : (
    <EmptyComponent />
  );
};


export const OrdersDataTable = async () => {
  const user = await getCurrentUser();
  const orders = await GetUserBookingsAsOrdersAction(user!);

  return orders.length ? (
    <DataTable
      columns={columns}
      data={orders}
    />
  ) : (
    <EmptyComponent />
  );
};