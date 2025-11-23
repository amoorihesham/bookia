import { db } from '../db'; // adjust path to your db instance
import { PlanTable } from '../schemas/plan-schema';

const initialPlans: (typeof PlanTable.$inferInsert)[] = [
  {
    name: 'free',
    price: 0,
    benfits: ['Create unlimited events', 'Access analytics dashboard'],
  },
  {
    name: 'pro',
    price: 20,
    stripe_price_id: 'price_1SVtOXRwFFQULsC3E9EtxhZm',
    benfits: ['Create unlimited events', 'Access analytics dashboard', 'Mark unlimited events as featured'],
  },
];

export async function seedPlans() {
  // Check if already seeded
  const existing = await db.select().from(PlanTable);
  if (existing.length > 0) {
    console.log('✅ Plans already seeded');
    return;
  }

  await db.insert(PlanTable).values(initialPlans);
  console.log('🌱 Plans seeded successfully');
}

// Run when executing directly: `ts-node drizzle/seed/plans.seed.ts`
seedPlans()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
