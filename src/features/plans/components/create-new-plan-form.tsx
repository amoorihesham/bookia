'use client';
import { useAppForm } from '@/hooks/useAppForm';
import { insertPlanSchema } from '../schemas';
import { FieldGroup } from '@/components/ui/field';
import { Loader, Plane } from 'lucide-react';
import { SelectItem } from '@/components/ui/select';
import { useTransition } from 'react';

export function CreateNewPlanForm() {
  const [isPending, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues: {
      name: '',
      price: '',
      max_featured_count: '0',
      frequency: 'monthly',
    },
    validators: {
      onSubmit: insertPlanSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        console.log(value);
      });
    },
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="bg-card/80 mx-auto mt-14 max-w-3xl rounded-md p-6"
    >
      <FieldGroup className="w-full gap-3 space-y-3">
        <div className="flex items-center gap-x-4">
          <form.AppField name="name">{field => <field.Input label="Plan Name" />}</form.AppField>
          <form.AppField name="price">{field => <field.Input label="Plan Price" />}</form.AppField>
        </div>
        <div className="flex items-center gap-x-4">
          <form.AppField name="frequency">
            {field => (
              <field.Select label="Plan Frequency">
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name="max_featured_count">
            {field => <field.Input label="Plan Max Featured Count" />}
          </form.AppField>
        </div>

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
