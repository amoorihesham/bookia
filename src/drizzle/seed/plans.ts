import { db } from '../db'; // adjust path to your db instance
import { PlanTable } from '../schemas/plan-schema';

const initialPlans: (typeof PlanTable.$inferInsert)[] = [
  {
    name: 'free',
    max_featured_count: 3,
    price: 0,
    frequancy: 'monthly',
  },
  {
    name: 'basic',
    max_featured_count: 50,
    price: 10,
    frequancy: 'monthly',
  },
  {
    name: 'ultimate',
    max_featured_count: 1000,
    price: 20,
    frequancy: 'monthly',
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
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
