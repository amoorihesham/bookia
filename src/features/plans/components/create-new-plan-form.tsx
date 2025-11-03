'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertPlanSchema } from '../schemas';
import { createNewPlan } from '../actions/admin';
import { toast } from 'sonner';
import z from 'zod';

export function CreateNewPlanForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof insertPlanSchema>>({
    resolver: zodResolver(insertPlanSchema),
    defaultValues: {
      name: '',
      price: 0,
      max_featured_count: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof insertPlanSchema>) => {
    startTransition(async () => {
      const { success, message, code, error } = await createNewPlan(values);
      if (success) {
        toast.success(message);
        form.reset();
        return;
      }
      toast.error(code, { description: error });
    });
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='min-w-full'
    >
      <FieldGroup className='w-full gap-3'>
        <Controller
          control={form.control}
          name='name'
          render={({ field, fieldState }) => (
            <Field>
              <FieldContent className='gap-2'>
                <FieldLabel className='capitalize'>plan name</FieldLabel>
                <Input {...field} />
                <FieldDescription className='text-xs tracking-wider m'>
                  Plan name that will show in website.
                </FieldDescription>
                <FieldError errors={[{ message: fieldState.error?.message }]} />
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name='price'
          render={({ field, fieldState }) => (
            <Field>
              <FieldContent className='gap-2'>
                <FieldLabel className='capitalize'>plan price</FieldLabel>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                <FieldDescription className='text-xs tracking-wider m'>
                  Plan price that will show in website.
                </FieldDescription>
                <FieldError errors={[{ message: fieldState.error?.message }]} />
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name='max_featured_count'
          render={({ field, fieldState }) => (
            <Field>
              <FieldContent className='gap-2'>
                <FieldLabel className='capitalize'>plan max featured count</FieldLabel>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                <FieldDescription className='text-xs tracking-wider m'>
                  Plan max featured count that will show in website.
                </FieldDescription>
                <FieldError errors={[{ message: fieldState.error?.message }]} />
              </FieldContent>
            </Field>
          )}
        />
        <Button
          disabled={isPending}
          type='submit'
          className='cursor-pointer mt-3 capitalize'
        >
          {isPending ? 'creating...' : 'create'}
        </Button>
      </FieldGroup>
    </form>
  );
}
