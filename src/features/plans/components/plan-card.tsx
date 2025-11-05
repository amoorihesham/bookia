import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanTable } from '@/drizzle/schema';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/shared/lib/auth';

type Props = typeof PlanTable.$inferSelect;
export default async function PlanCard({ id, name, frequancy, max_featured_count, price }: Props) {
  const user = await getCurrentUser();
  const active = user?.plan_id === id;
  return (
    <Card className={cn('relative overflow-hidden bg-card/40 border-2', active && 'border-chart-4')}>
      {active && (
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-chart-4)_15%,transparent_60%)] blur-xl z-[-1]' />
      )}

      <CardHeader>
        <CardTitle className='capitalize font-bold text-5xl'>{name}</CardTitle>
      </CardHeader>
      <CardContent className='mt-8'>
        <p className='font-semibold  mb-3 text-sm'>For your hobby projects</p>
        <ul className='list-disc px-7 space-y-3 text-sm'>
          <li>Free email alerts</li>
          <li>3-minute checks</li>
          <li>Automatic data enrichment</li>
          <li>10 monitors Up to 3 seats</li>
        </ul>
      </CardContent>
      <CardFooter className='mt-10'>{!active && <Button className='w-full'>Get Started</Button>}</CardFooter>
    </Card>
  );
}
