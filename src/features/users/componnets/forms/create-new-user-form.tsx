'use client';
import { useAppForm } from '@/hooks/useAppForm';
import { FieldGroup } from '@/components/ui/field';
import { Loader, User } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { createNewUserSchema } from '../../schemas';
import { createNewUserAction } from '../../actions/admin/mutations';
import { SelectItem } from '@/components/ui/select';

export function CreateNewUserForm() {
  const [isPending, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues: {
      clerk_id: '',
      username: '',
      email: '',
      role: 'user',
      plan: 'a20c9818-3778-4013-a8c9-a2ac5ee7f536',
      method: 'admin_portal',
    },
    validators: {
      onSubmit: createNewUserSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const { success, message, errors } = await createNewUserAction(value);

        if (!success) {
          toast.error(message, {
            description: errors?.[0] ?? errors,
          });
        } else {
          toast.success(message);
          form.reset();
        }
      });
    },
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="rounded-md"
    >
      <FieldGroup className="w-full gap-3 space-y-3">
        <form.AppField name="clerk_id">{field => <field.Input label="Clerk ID" />}</form.AppField>
        <form.AppField name="username">{field => <field.Input label="Username" />}</form.AppField>
        <form.AppField name="email">{field => <field.Input label="Email" />}</form.AppField>
        <form.AppField name="role">
          {field => (
            <field.Select label="Role">
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name="plan">
          {field => (
            <field.Select label="Plan">
              <SelectItem value="a20c9818-3778-4013-a8c9-a2ac5ee7f536">Free</SelectItem>
              <SelectItem value="1dd6eef9-4e1e-4438-b1af-65b9c5ab9ea0">Pro</SelectItem>
            </field.Select>
          )}
        </form.AppField>

        <form.AppForm>
          <form.FormSubmitButton
            label={`Create New User`}
            pendingLabel={`Creating User Info...`}
            Icon={User}
            PendingIcon={Loader}
            disabled={isPending}
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
