import { PlanTable } from '@/drizzle/schema';

export default function PlanCard({ plan }: { plan: typeof PlanTable.$inferSelect }) {
  return (
    <div className='border rounded-md w-full bg-card/60 flex flex-col items-center py-4'>
      <div className='flex flex-col items-center gap-2 '>
        <h3 className='text-2xl capitalize text-primary'>{plan.name}</h3>
        <span className='text-3xl font-semibold text-chart-2'>{plan.price}$</span>
      </div>
    </div>
  );
}
