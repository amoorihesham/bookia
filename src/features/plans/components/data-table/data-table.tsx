import { DataTable, EmptyComponent } from '@/components/shared';
import { getAllPlansAction } from '../../actions/query';
import { columns } from './columns';

export const PlansDataTable = async () => {
  const plans = await getAllPlansAction();
  return plans.length ? (
    <DataTable
      columns={columns}
      data={plans}
    />
  ) : (
    <EmptyComponent />
  );
};
