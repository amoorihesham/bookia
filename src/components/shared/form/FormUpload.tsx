import { useFieldContext } from '@/hooks/useAppForm';
import { FormBase, FormControlProps } from './FormBase';
import { Input } from '@/components/ui/input';

export const FormUpload = ({ ...props }: FormControlProps) => {
  const field = useFieldContext<FileList | null>();
  const isInvalid = !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Input
        id={field.name}
        type='file'
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.files!)}
        aria-invalid={isInvalid}
        placeholder={'Select File'}
      />
    </FormBase>
  );
};
