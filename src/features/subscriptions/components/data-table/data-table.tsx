import { DataTable, EmptyComponent } from '@/components/shared';
import { GetAllSubscriptions } from '../../actions/query';
import { columns } from './columns';

export const SubscriptionsDataTable = async () => {
  const subscriptions = await GetAllSubscriptions();
  return subscriptions.length ? (
    <DataTable
      columns={columns}
      data={subscriptions}
    />
  ) : (
    <EmptyComponent />
  );
};
