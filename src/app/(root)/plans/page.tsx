import { getAllPlansAction } from '@/features/plans/actions/query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function PricingPage() {
  const plans = await getAllPlansAction();

  return (
    <>
      <div className='mx-auto max-w-2xl space-y-1 lg:space-y-4 text-center mb-6 lg:mb-12'>
        <h1 className='text-center text-2xl font-semibold lg:text-5xl'>Pricing that Scales with You</h1>
        <p className='text-xs lg:text-base'>
          Whether you&apos;re an individual or a business, our plans are designed to scale with your needs. Choose the
          plan that gives you access to the tools and features you need to create, manage, and grow effortlessly.
        </p>
      </div>

      <div className='mt-8 grid gap-6 md:mt-20 md:grid-cols-2'>
        {plans.map((plan) => (
          <Card
            className='flex flex-col bg-card/20 relative'
            key={plan.id}
          >
            {plan.name === 'pro' && (
              <span className='bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5'>
                Best
              </span>
            )}
            <CardHeader>
              <CardTitle className='font-medium capitalize'>{plan.name}</CardTitle>
              <span className='my-3 block text-2xl font-semibold'>${plan.price} / Life-Time</span>
            </CardHeader>

            <CardContent className='space-y-4'>
              <hr className='border-dashed' />

              <ul className='list-outside space-y-3 text-sm'>
                {plan.benfits.map((ben, idx) => (
                  <li key={idx + 1}>{ben}</li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className='mt-auto'>
              {plan.name === 'pro' && <Button className='w-full'>Get Started</Button>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
