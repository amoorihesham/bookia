import { getAllPlansAction } from '@/features/plans/actions/query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UpgradePlanButton } from '@/features/plans/components/buttons';
import { TextAnimate } from '@/components/ui/text-animate';
import { BlurFade } from '@/components/ui/blur-fade';

export default async function PricingPage() {
  const plans = await getAllPlansAction();

  return (
    <>
      <div className="mx-auto mb-6 max-w-2xl space-y-1 text-center lg:mb-12 lg:space-y-4">
        <TextAnimate
          className="text-center text-2xl font-semibold lg:text-5xl"
          animation="blurInDown"
          as="h1"
          duration={0.4}
          by="word"
          once
        >
          Pricing that Scales with You
        </TextAnimate>
        <TextAnimate
          className="text-xs lg:text-base"
          animation="blurInUp"
          duration={0.2}
          delay={0.5}
          as={'p'}
          by="line"
          once
        >
          {`Whether you&apos;re an individual or a business, our plans are designed to scale with your\nneeds. Choose the plan that gives you access to the tools and features you need to create,\nmanage, and grow effortlessly.`}
        </TextAnimate>
      </div>

      <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-2">
        {plans.map((plan, idx) => (
          <BlurFade
            key={plan.id}
            delay={0.4 + idx * 0.4}
            inView
          >
            <Card className="bg-card/20 relative flex h-full w-full flex-col">
              {plan.name === 'pro' && (
                <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-white/20 ring-offset-1 ring-offset-gray-950/5 ring-inset">
                  Best
                </span>
              )}
              <CardHeader>
                <CardTitle className="font-medium capitalize">{plan.name}</CardTitle>
                <span className="my-3 block text-2xl font-semibold">${plan.price} / Life-Time</span>
              </CardHeader>

              <CardContent className="space-y-4">
                <hr className="border-dashed" />

                <ul className="list-outside space-y-3 text-sm">
                  {plan.benfits.map((ben, idx) => (
                    <li key={idx + 1}>{ben}</li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">{plan.name === 'pro' && <UpgradePlanButton planName="pro" />}</CardFooter>
            </Card>
          </BlurFade>
        ))}
      </div>
    </>
  );
}
