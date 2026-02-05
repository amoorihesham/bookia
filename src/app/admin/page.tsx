import { StatsSection } from '@/features/admin/components/sections';
import { Suspense } from 'react';

export default async function AdminHomepage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <StatsSection />
      </Suspense>
    </div>
  );
}
