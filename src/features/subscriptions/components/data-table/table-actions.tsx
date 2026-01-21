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
import { SubscriptionType } from '../../types';
import { CopyToClipboardButtonMenuItem, DeleteButtonMenuItem } from '@/components/buttons';
import { DatabaseUser } from '@/features/users/types';
import { PlanType } from '@/features/plans/types';

export const TableActions = ({ row }: { row: Row<SubscriptionType & { user: DatabaseUser; plan: PlanType }> }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(String(row.original.id));
    toast.info('Plan ID copied to clipboard');
  };

  const deletePlan = async () => {
    // const { success, message, errors } = await deletePlanAction(row.original.name as PlanNameType);
    // if (success) {
    //   toast.success(message);
    // } else {
    //   toast.error(errors?.[0] ?? errors);
    // }
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
          title="Copy Plan Id"
          onClickFn={copyToClipboard}
        />

        {/* <UpdatePlanDialog plan={row.original} /> */}
        <DropdownMenuSeparator />

        <DeleteButtonMenuItem
          title="Delete Plan"
          onClickFn={deletePlan}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
