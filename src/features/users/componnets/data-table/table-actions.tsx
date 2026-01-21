'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { CopyToClipboardButtonMenuItem, DeleteButtonMenuItem } from '@/components/buttons';
import { DatabaseUser } from '@/features/users/types';
import { deleteUserAction } from '@/features/users/actions/admin/mutations';
import { UpdateUserDialog } from '../dialogs/update-user-dialog';

export const TableAction = ({ row }: { row: Row<DatabaseUser> }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(String(row.original.clerk_id));
    toast.info('User ID copied to clipboard');
  };

  const deleteUser = async () => {
    const { success, message, errors } = await deleteUserAction(row.original.clerk_id);
    if (success) {
      toast.success(message);
    } else {
      toast.error(errors?.[0] ?? errors);
    }
  };

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
      <DropdownMenuContent
        align="end"
        className="space-y-1"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <CopyToClipboardButtonMenuItem
          title="Copy User Id"
          onClickFn={copyToClipboard}
        />

        <UpdateUserDialog user={row.original} />
        <DropdownMenuSeparator />

        <DeleteButtonMenuItem
          title="Delete User"
          onClickFn={deleteUser}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
