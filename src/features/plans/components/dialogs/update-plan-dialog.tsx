import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlanType } from '../../types';
import { UpdatePlanForm } from '../forms';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const UpdatePlanDialog = ({ plan }: { plan: PlanType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
        >
          <Edit />
          Update Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Update <span className="text-chart-4 uppercase">{plan.name} </span>Plan
          </DialogTitle>
        </DialogHeader>
        <UpdatePlanForm plan={plan} />
      </DialogContent>
    </Dialog>
  );
};
