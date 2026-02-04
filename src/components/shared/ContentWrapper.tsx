import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const ContentWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <main className={cn('mx-auto max-w-[1440px] px-4 lg:px-6', className)}>{children}</main>;
};
