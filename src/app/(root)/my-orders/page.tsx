import { Suspense } from 'react';
import { OrdersDataTable } from '@/features/bookings/components';

export default async function MyOrdersPage() {
  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">Your Booked Events</h1>
        <p className="text-xs lg:text-base">
          Keep track of all the events you&apos;ve secured tickets for. View event details, upcoming dates, and make
          sure you don&apos; t miss any of the experiences you&apos; ve signed up for.
        </p>
      </div>
      <Suspense fallback={<div className="h-screen w-full animate-pulse bg-red-500" />}>
        <OrdersDataTable />
      </Suspense>
    </>
  );
}
