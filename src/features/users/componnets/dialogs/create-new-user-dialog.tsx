import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Construction } from 'lucide-react';
import { CreateNewUserForm } from '../forms/create-new-user-form';

export const CreateNewUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer capitalize">
          <Construction /> create new user
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Create New User</DialogTitle>
        </DialogHeader>
        <CreateNewUserForm />
      </DialogContent>
    </Dialog>
  );
};
