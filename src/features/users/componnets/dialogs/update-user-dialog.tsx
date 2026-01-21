import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { DatabaseUser } from '../../types';
import { UpdateUserForm } from '../forms/update-user-form';

export const UpdateUserDialog = ({ user }: { user: DatabaseUser }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
        >
          <Edit />
          Update User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Update <span className="text-chart-4 uppercase">{user.username} </span>Info
          </DialogTitle>
        </DialogHeader>
        <UpdateUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
};
