'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PlanTable } from '@/drizzle/schema';
import { useForm } from 'react-hook-form';

export function CreateNewPlanForm() {
  const form = useForm<typeof PlanTable.$inferInsert>({
    defaultValues: {
      max_featured_count: '',
      name: '',
      price: 0,
    },
  });

  const onSubmit = async (values: typeof PlanTable.$inferInsert) => {
    console.log(values);
  };
  return (
    <div className='w-full max-w-md'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup className='flex-row'>
            <Field>
              <FieldLabel>plan name</FieldLabel>
              <Input />
              <FieldDescription>Plan name that will show in website.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>plan name</FieldLabel>
              <Input />
              <FieldDescription>Plan name that will show in website.</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
