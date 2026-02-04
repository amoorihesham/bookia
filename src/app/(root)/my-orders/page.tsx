import { Suspense } from 'react';
import { TextAnimate } from '@/components/ui/text-animate';
import { OrdersDataTable } from '@/features/bookings/components';
import { TableSkeleton } from '@/components/shared';

export default async function MyOrdersPage() {
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
          Your Booked Events
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
          {`Keep track of all the events you've secured tickets for. View event details, upcoming dates, and make
          sure you don' t miss any of the experiences you' ve signed up for.`}
        </TextAnimate>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <OrdersDataTable />
      </Suspense>
    </>
  );
}
