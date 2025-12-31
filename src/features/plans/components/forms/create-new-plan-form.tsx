'use client';
import { useAppForm } from '@/hooks/useAppForm';
import { CreateNewPlanInput, createPlanSchema } from '../../schemas';
import { FieldGroup } from '@/components/ui/field';
import { Loader, Plane } from 'lucide-react';
import { useTransition } from 'react';
import { createPlanAction } from '../../actions/mutations';
import { toast } from 'sonner';

const defaultValues: CreateNewPlanInput = {
  name: '',
  price: '',
  benfits: '',
};

export function CreateNewPlanForm() {
  const [isPending, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: createPlanSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const { success, message, errors } = await createPlanAction(value);

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
      className="mx-auto w-full rounded-md"
    >
      <FieldGroup className="w-full gap-3 space-y-3">
        <form.AppField name="name">{field => <field.Input label="Plan Name" />}</form.AppField>
        <form.AppField name="price">{field => <field.Input label="Plan Price" />}</form.AppField>
        <form.AppField name="benfits">{field => <field.Input label="Plan Benfits" />}</form.AppField>

        <form.AppForm>
          <form.FormSubmitButton
            label="Create New Plan"
            pendingLabel="Createing New Plan"
            Icon={Plane}
            PendingIcon={Loader}
            disabled={isPending}
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
