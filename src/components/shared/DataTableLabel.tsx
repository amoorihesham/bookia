import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

export const DataTableLabel = ({ label, className }: { label: string; className?: string }) => {
  return (
    <Label className={cn('flex items-center justify-center text-center text-lg font-light uppercase', className)}>
      {label}
    </Label>
  );
};
