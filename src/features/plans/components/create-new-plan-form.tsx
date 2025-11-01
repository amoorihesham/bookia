'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='min-w-full'
    >
      <FieldGroup className='w-full gap-3'>
        <Field>
          <FieldContent className='gap-2'>
            <FieldLabel className='capitalize'>plan name</FieldLabel>
            <Input />
            <FieldDescription className='text-xs tracking-wider m'>
              Plan name that will show in website.
            </FieldDescription>
            <FieldError errors={[]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldContent className='gap-2'>
            <FieldLabel className='capitalize'>plan price</FieldLabel>
            <Input />
            <FieldDescription className='text-xs tracking-wider m'>
              Plan price that will show in website.
            </FieldDescription>
            <FieldError errors={[]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldContent className='gap-2'>
            <FieldLabel className='capitalize'>plan max featured count</FieldLabel>
            <Input />
            <FieldDescription className='text-xs tracking-wider m'>
              Plan max featured count that will show in website.
            </FieldDescription>
            <FieldError errors={[]} />
          </FieldContent>
        </Field>
        <Button
          type='submit'
          className='cursor-pointer mt-3 capitalize'
        >
          create
        </Button>
      </FieldGroup>
    </form>
  );
}
