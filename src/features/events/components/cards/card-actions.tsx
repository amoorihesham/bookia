import React from 'react';
import { cn } from '@/lib/utils';

export const CardActions = ({
  className,
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-background/30 border-chart-4/20 absolute -top-full left-1/2 flex w-40 -translate-x-1/2 items-center justify-center gap-2 rounded-full border px-3 py-1 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:top-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
