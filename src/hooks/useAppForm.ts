import {
  DatePicker,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitButton,
  FormUpload,
  TimePicker
} from '@/components/shared/form';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Upload: FormUpload,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    Date: DatePicker,
    Time: TimePicker
  },
  formComponents: {
    FormSubmitButton: SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
