import React from 'react';
import { cn } from '@/lib/utils';

export const CardActions = ({ className, children, ...props }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute w-40 flex items-center gap-2 justify-center transition-all duration-300 -top-full group-hover:top-3 left-1/2 -translate-x-1/2 bg-background/30 border-chart-4/20 shadow-xl border backdrop-blur-sm rounded-full px-3 py-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
