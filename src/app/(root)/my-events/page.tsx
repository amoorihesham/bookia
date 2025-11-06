import { cacheLife } from 'next/cache';

export default async function StatsSection() {
  'use cache';
  cacheLife('minutes');
  return (
    <section className='py-12 md:py-20'>
      <div className='mx-auto max-w-5xl space-y-8 px-6 md:space-y-16'>
        <div className='relative z-10 mx-auto max-w-xl space-y-6 text-center'>
          <h2 className='text-4xl font-medium lg:text-5xl'>Events in numbers</h2>
          <p>
            Your events at a glance—analyze performance, track ticket sales, monitor engagement, and gain insights to
            level up your next event.
          </p>
        </div>

        <div className='grid gap-12 divide-y *:text-center md:grid-cols-4 md:gap-2 md:divide-x md:divide-y-0'>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>+1200</div>
            <p>Total Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>22 Million</div>
            <p>Featured Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>+500</div>
            <p>Open Events</p>
          </div>
          <div className='space-y-4'>
            <div className='text-5xl font-bold'>+500</div>
            <p>Closed Events</p>
          </div>
        </div>
      </div>
    </section>
  );
}
