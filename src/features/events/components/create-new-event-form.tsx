'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Construction } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field';
import { SelectItem } from '@/components/ui/select';
import { createNewEventSchema } from '../schemas';
import { createNewEventAction } from '../actions/mutation';
import { useAppForm } from '@/hooks/useAppForm';

export const CreateNewEventForm = () => {
  const [_, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues: {
      name: '',
      place: '',
      guests: '',
      held_on: new Date().toISOString(),
      tickets: '0',
      ticket_price: '0',
      open: 'true',
      featured: 'false',
    },

    validators: {
      onSubmit: createNewEventSchema,
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const result = await createNewEventAction(value);
        if (result.success && 'data' in result) {
          toast.success(result.message, { description: `Event ${result.data.name} created successfully.` });
          form.reset();
          return;
        }
        if ('errors' in result && result.errors.length > 0) {
          toast.error(result.message, { description: result.errors.join(', ') });
          return;
        }
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='max-w-3xl mx-auto mt-6 lg:mt-14 bg-card/80 p-4 lg:p-6 rounded-md'
    >
      <FieldGroup className='w-full gap-2 lg:gap-3  space-y-2'>
        <div className='flex flex-col lg:flex-row items-center gap-4 lg:gap-x-4'>
          <form.AppField name='name'>
            {(field) => (
              <field.Input
                label='Event name'
                placeholder='React conf 2025'
              />
            )}
          </form.AppField>
          <form.AppField name='place'>
            {(field) => (
              <field.Input
                label='Event place'
                placeholder='Copghenhagen'
              />
            )}
          </form.AppField>
        </div>
        <div className='flex items-center gap-x-4'>
          <form.AppField name='tickets'>{(field) => <field.Input label='Event avaliable tickets' />}</form.AppField>
          <form.AppField name='ticket_price'>{(field) => <field.Input label='Event ticket price' />}</form.AppField>
        </div>
        <div className='flex items-center gap-x-4'>
          <form.AppField name='open'>
            {(field) => (
              <field.Select label='Event status'>
                <SelectItem value='true'>open</SelectItem>
                <SelectItem value='false'>closed</SelectItem>
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name='featured'>
            {(field) => (
              <field.Select label='Event featured status'>
                <SelectItem value='true'>featured</SelectItem>
                <SelectItem value='false'>normal</SelectItem>
              </field.Select>
            )}
          </form.AppField>
        </div>
        <form.AppField name='held_on'>{(field) => <field.Datetime label='Event held on date' />}</form.AppField>
        <form.AppField name='guests'>
          {(field) => (
            <field.Input
              label='Event guests'
              placeholder='Comma seprated ex Jhon_Doe,Marie_Martin'
            />
          )}
        </form.AppField>

        <form.AppForm>
          <form.FormSubmitButton
            label='Create Event'
            pendingLabel='Createing Event...'
            className='capitalize'
            Icon={Construction}
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
};
