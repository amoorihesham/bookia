'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ReactNode } from 'react';

export function AppSidebarClient({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-center gap-1 overflow-hidden border-b p-2">
          <SidebarTrigger />
          <span className="hidden text-xl">Bookia</span>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    );
  }

  return children;
}
