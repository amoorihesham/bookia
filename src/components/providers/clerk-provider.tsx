'use cleint';

import { ReactNode } from 'react';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';

export const ClerkProvider = ({ children }: { children: ReactNode }) => {
  return <OriginalClerkProvider>{children}</OriginalClerkProvider>;
};
