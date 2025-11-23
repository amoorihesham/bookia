import { cn } from '@/lib/utils';

export const CardContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};
