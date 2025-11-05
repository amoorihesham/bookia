import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import PlansGrid from '@/features/plans/components/plans-grid';
import PlansGridSkeleton from '@/features/plans/components/plans.grid.skeleton';

export default async function PlansPage() {
  return (
    <div className='py-8'>
      <div className='text-center flex flex-col gap-2'>
        <h1 className='text-5xl text-foreground font-semibold'>Plans and Pricing</h1>
        <p className='text-muted-foreground'>Receive unlimited credits when you pay yearly, and save on your plan.</p>
      </div>
      <div className='bg-muted h-12 w-[20%] mx-auto rounded-full mt-6 flex items-center px-6 justify-between'>
        <p className='capitalize font-semibold'>monthly</p>
        <p className='capitalize font-semibold'>annual</p>
        <Badge>save 40%</Badge>
      </div>
      <Suspense fallback={<PlansGridSkeleton />}>
        <PlansGrid />
      </Suspense>
    </div>
  );
}
