import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cacheLife } from 'next/cache';

export default async function PricingPage() {
  'use cache';
  cacheLife('days');

  return (
    <section className='py-16 md:py-32'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='mx-auto max-w-2xl space-y-6 text-center'>
          <h1 className='text-center text-4xl font-semibold lg:text-5xl'>Pricing that Scales with You</h1>
          <p>
            Our pricing is built to grow with you. From individuals to businesses, pick the plan that unlocks the tools
            and features you need to create and scale effortlessly.
          </p>
        </div>

        <div className='mt-8 grid gap-6 md:mt-20 md:grid-cols-3'>
          <Card className='flex flex-col bg-card/20'>
            <CardHeader>
              <CardTitle className='font-medium'>Free</CardTitle>
              <span className='my-3 block text-2xl font-semibold'>$0 / mo</span>
            </CardHeader>

            <CardContent className='space-y-4'>
              <hr className='border-dashed' />

              <ul className='list-outside space-y-3 text-sm'>
                {['Basic Analytics Dashboard', 'Unlimited Events Creation', 'Up to 3 Featured Events'].map(
                  (item, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2'
                    >
                      <Check className='size-3' />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>

            <CardFooter className='mt-auto'>
              <Button
                asChild
                variant='outline'
                className='w-full'
              >
                <Link href=''>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className='relative bg-card/80'>
            <span className='bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5'>
              Popular
            </span>

            <CardHeader>
              <CardTitle className='font-medium'>Basic</CardTitle>
              <span className='my-3 block text-2xl font-semibold'>$5 / mo</span>
            </CardHeader>

            <CardContent className='space-y-4'>
              <hr className='border-dashed' />
              <ul className='list-outside space-y-3 text-sm'>
                {['Basic Analytics Dashboard', 'Unlimited Events Creation', 'Up to 100 Featured Events'].map(
                  (item, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2'
                    >
                      <Check className='size-3' />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>

            <CardFooter className='mt-auto'>
              <Button
                asChild
                className='w-full'
              >
                <Link href=''>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className='flex flex-col bg-card/20'>
            <CardHeader>
              <CardTitle className='font-medium'>Ultimate</CardTitle>
              <span className='my-3 block text-2xl font-semibold'>$10 / mo</span>
            </CardHeader>

            <CardContent className='space-y-4'>
              <hr className='border-dashed' />

              <ul className='list-outside space-y-3 text-sm'>
                {['Basic Analytics Dashboard', 'Unlimited Events Creation', 'Up to 1000 Featured Events'].map(
                  (item, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2'
                    >
                      <Check className='size-3' />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>

            <CardFooter className='mt-auto'>
              <Button
                asChild
                variant='outline'
                className='w-full'
              >
                <Link href=''>Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
