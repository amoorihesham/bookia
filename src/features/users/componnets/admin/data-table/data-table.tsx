import { DataTable, EmptyComponent } from '@/components/shared';
import { columns } from './columns';
import { GetAllUsersAction } from '@/features/users/actions/admin/query';

export const UsersDataTable = async () => {
  const users = await GetAllUsersAction();
  return users.length ? (
    <DataTable
      columns={columns}
      data={users}
    />
  ) : (
    <EmptyComponent />
  );
};
