import { EmptyComponent } from '@/components/shared';
import { GetUserBookingsAction } from '@/features/bookings/actions/query';
import { connection } from 'next/server';

export default async function MyBookingsPage() {
  await connection();
  const bookings = await GetUserBookingsAction();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <h1 className="text-center text-2xl font-semibold lg:text-5xl">My Booked Events</h1>
        <p className="text-xs lg:text-base">
          View all the events you&apos;ve booked in one place. Check past and upcoming experiences and revisit the
          moments that matter.
        </p>
      </div>

      <EmptyComponent />
    </>
  );
}
