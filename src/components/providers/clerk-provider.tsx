'use client';

import { ReactNode, Suspense } from 'react';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';

export const ClerkProvider = ({ children }: { children: ReactNode }) => {
  const isDarkMode = useIsDarkTheme();

  return (
    <Suspense>
      <OriginalClerkProvider
        appearance={isDarkMode ? { theme: [dark] } : undefined}
      >
        {children}
      </OriginalClerkProvider>
    </Suspense>
  );
};
