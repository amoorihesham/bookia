import { ReactNode, Suspense } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='h-screen flex items-center justify-center'>
      <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
    </main>
  );
}
