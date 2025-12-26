'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { Clipboard, Edit, Loader2, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { PlanNameType, PlanType } from '../../types';
import { useTransition } from 'react';
import { deletePlanAction } from '../../actions/mutations';

export const TableAction = ({ row }: { row: Row<PlanType> }) => {
  const [isPending, startTransition] = useTransition();

  const copyToClipboard = () => {
    startTransition(async () => {
      await navigator.clipboard.writeText(String(row.original.id));
      toast.info('Plan ID copied to clipboard');
    });
  };

  const deletePlan = () => {
    startTransition(async () => {
      const { success, message, errors } = await deletePlanAction(row.original.name as PlanNameType);
      if (success) {
        toast.success(message);
      } else {
        toast.error(errors?.[0] ?? errors);
      }
    });
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
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={copyToClipboard}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Clipboard />}
          Copy Plan ID
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Edit />}
          Update Plan
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={deletePlan}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash />}
          Delete Plan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
