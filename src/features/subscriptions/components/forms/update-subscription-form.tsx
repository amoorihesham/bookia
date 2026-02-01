'use client';
import { useAppForm } from '@/hooks/useAppForm';
import { FieldGroup } from '@/components/ui/field';
import { Loader, Subscript } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { SubscriptionType } from '../../types';
import { updateSubscriptionAction } from '../../actions/mutaions';
import { SelectItem } from '@/components/ui/select';
import { updateSubscriptionSchema } from '../../schemas';

export function UpdateSubscriptionForm({ subscription }: { subscription: SubscriptionType }) {
  const [isPending, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues: {
      planId: subscription.plan_id,
      is_active: String(subscription.is_active),
    },
    validators: {
      onSubmit: updateSubscriptionSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const { success, message, errors } = await updateSubscriptionAction(subscription.id, value);

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
        <form.AppField name="planId">
          {field => (
            <field.Select label="Plan">
              <SelectItem value="a20c9818-3778-4013-a8c9-a2ac5ee7f536">Free</SelectItem>
              <SelectItem value="1dd6eef9-4e1e-4438-b1af-65b9c5ab9ea0">Pro</SelectItem>
            </field.Select>
          )}
        </form.AppField>
        <form.AppField name="is_active">
          {field => (
            <field.Select label="Is Active">
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </field.Select>
          )}
        </form.AppField>

        <form.AppForm>
          <form.FormSubmitButton
            label={`Update Subscription`}
            pendingLabel={`Updating Subscription...`}
            Icon={Subscript}
            PendingIcon={Loader}
            disabled={isPending}
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
