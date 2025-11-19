import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const ContentWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <main className={cn('max-w-[1440px] mx-auto px-4 lg:px-0', className)}>{children}</main>;
};
