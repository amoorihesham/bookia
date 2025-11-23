import { Button } from '@/components/ui/button';
import { useFormContext } from '@/hooks/useAppForm';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export function SubmitButton({
  label = 'Submit',
  pendingLabel = 'Submiting...',
  className,
  Icon,
}: {
  label?: string;
  pendingLabel?: string;
  className?: string;
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          disabled={isSubmitting}
          type="submit"
          className={className ?? ''}
        >
          {Icon && <Icon />}
          {isSubmitting ? pendingLabel : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
