import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Construction } from 'lucide-react';
import { CreateNewPlanForm } from './create-new-plan-form';
export const CreateNewPlanDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='capitalize cursor-pointer'>
          <Construction /> create new plan
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-sm'>
        <DialogHeader>
          <DialogTitle className='text-center font-semibold text-xl'>Create New Plan</DialogTitle>
        </DialogHeader>
        <CreateNewPlanForm />
      </DialogContent>
    </Dialog>
  );
};
