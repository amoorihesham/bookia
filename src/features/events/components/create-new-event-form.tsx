'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Construction, Loader } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field';
import { SelectItem } from '@/components/ui/select';
import { createNewEventFormInput, createNewEventSchema } from '../schemas';
import { createNewEventAction } from '../actions/mutation';
import { useAppForm } from '@/hooks/useAppForm';

const defaultValues: createNewEventFormInput = {
  name: '',
  place: '',
  guests: '',
  featured: 'false',
  open: 'true',
  held_on: new Date(new Date().setHours(0, 0, 0, 0)),
  ticket_price: '0',
  tickets: '0',
  cover_thumbnail: undefined as unknown as FileList,
  time_on: '12:00',
};

export const CreateNewEventForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useAppForm({
    defaultValues,

    validators: {
      onSubmit: createNewEventSchema,
    },

    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const { success, message, errors } = await createNewEventAction(value);

        if (!success) {
          toast.error(message, {
            description: errors?.[0] ?? errors,
          });
          return;
        }

        toast.success(message);
        form.reset();
      });
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="bg-card/80 mx-auto mt-6 max-w-3xl rounded-md p-4 lg:mt-14 lg:p-6"
    >
      <FieldGroup className="w-full gap-2 space-y-2 lg:gap-3">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-x-4">
          <form.AppField name="name">
            {field => (
              <field.Input
                label="Event name"
                placeholder="React conf 2025"
              />
            )}
          </form.AppField>
          <form.AppField name="place">
            {field => (
              <field.Input
                label="Event place"
                placeholder="Copghenhagen"
              />
            )}
          </form.AppField>
        </div>
        <div className="flex items-center gap-x-4">
          <form.AppField name="tickets">{field => <field.Input label="Event avaliable tickets" />}</form.AppField>
          <form.AppField name="ticket_price">{field => <field.Input label="Event ticket price" />}</form.AppField>
        </div>
        <div className="flex items-center gap-x-4">
          <form.AppField name="open">
            {field => (
              <field.Select label="Event status">
                <SelectItem value="true">open</SelectItem>
                <SelectItem value="false">closed</SelectItem>
              </field.Select>
            )}
          </form.AppField>
          <form.AppField name="featured">
            {field => (
              <field.Select label="Event featured status">
                <SelectItem value="true">featured</SelectItem>
                <SelectItem value="false">normal</SelectItem>
              </field.Select>
            )}
          </form.AppField>
        </div>
        <div className="flex flex-col items-center gap-x-4 gap-y-3 lg:flex-row">
          <form.AppField name="held_on">{field => <field.Date label="Event held on date" />}</form.AppField>
          <form.AppField name="time_on">{field => <field.Time label="Event held on time" />}</form.AppField>
        </div>
        <form.AppField name="guests">
          {field => (
            <field.Input
              label="Event guests"
              placeholder="Comma seprated ex Jhon_Doe,Marie_Martin"
            />
          )}
        </form.AppField>
        <form.AppField name="cover_thumbnail">{field => <field.Upload label="Cover Thimbnail" />}</form.AppField>

        <form.AppForm>
          <form.FormSubmitButton
            label="Create Event"
            pendingLabel="Createing Event..."
            className="capitalize"
            Icon={Construction}
            PendingIcon={Loader}
            disabled={isPending}
          />
        </form.AppForm>
      </FieldGroup>
    </form>
  );
};
