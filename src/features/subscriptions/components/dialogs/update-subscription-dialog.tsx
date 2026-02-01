import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SubscriptionType } from '../../types';
import { UpdateSubscriptionForm } from '../forms';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const UpdateSubscriptionDialog = ({ subscription }: { subscription: SubscriptionType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
        >
          <Edit />
          Update Subscription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Update <span className="text-chart-4 uppercase">{subscription.id} </span>Subscription
          </DialogTitle>
        </DialogHeader>
        <UpdateSubscriptionForm subscription={subscription} />
      </DialogContent>
    </Dialog>
  );
};
