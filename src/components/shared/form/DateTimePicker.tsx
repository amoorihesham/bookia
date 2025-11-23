import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormBase, FormControlProps } from './FormBase';
import { useFieldContext } from '@/hooks/useAppForm';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export function DateTimePicker(props: FormControlProps) {
  const field = useFieldContext<Date>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[250px] justify-start text-left font-normal"
            aria-invalid={isInvalid}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.state.value ? format(new Date(field.state.value), 'PPPP, hh:mm') : <span>Pick a date & time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col space-y-2 p-3"
          align="start"
        >
          <Calendar
            mode="single"
            selected={field.state.value ? new Date(field.state.value) : new Date()}
            onSelect={d => field.handleChange(d!)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormBase>
  );
}
