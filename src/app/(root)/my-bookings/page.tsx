import { TableSkeleton } from '@/components/shared';
import { TextAnimate } from '@/components/ui/text-animate';
import { BookingsDataTable } from '@/features/bookings/components';
import { Suspense } from 'react';

export default async function MyBookingsPage() {
  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-center text-2xl font-semibold lg:text-5xl"
          animation="blurInDown"
          as="h1"
          duration={0.6}
          by="word"
          once
        >
          My Booked Events
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          duration={0.2}
          delay={0.8}
          as={'p'}
          by="line"
          once
        >
          {`View all the events you've booked in one place. Check past and upcoming experiences and revisit the
          moments that matter.`}
        </TextAnimate>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <BookingsDataTable />
      </Suspense>
    </>
  );
}
