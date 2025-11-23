'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const TooltipButton = ({
  children,
  className,
  tooltip,
}: {
  children: ReactNode;
  tooltip: string;
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={cn(className)}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
