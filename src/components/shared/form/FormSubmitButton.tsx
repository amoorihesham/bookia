import { Button } from '@/components/ui/button';
import { useFormContext } from '@/hooks/useAppForm';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export function SubmitButton({
  label = 'Submit',
  pendingLabel = 'Submiting...',
  className,
  Icon,
  disabled,
}: {
  label?: string;
  pendingLabel?: string;
  className?: string;
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  disabled?: boolean;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          disabled={isSubmitting || disabled}
          type="submit"
          className={className ?? ''}
        >
          {Icon && <Icon />}
          {isSubmitting || disabled ? pendingLabel : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
