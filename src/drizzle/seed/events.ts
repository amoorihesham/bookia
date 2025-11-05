import { db } from '../db'; // adjust path to your db instance
import { EventTable } from '../schema';

const initialEvents: (typeof EventTable.$inferInsert)[] = [
  {
    name: 'React Conf 2025',
    user_id: 'user_352NhNJMHjLhFBj1R5Jo8X2sUgF',
    place: 'online',
    open: true,
    featured: false,
    tickets: 100,
    ticket_price: 5,
    guests: ['Amr Hesha', 'Jack'],
    held_on: new Date('2025-03-15T10:00:00Z').toISOString(),
  },
  {
    name: 'Next Conf 2025',
    user_id: 'user_352NhNJMHjLhFBj1R5Jo8X2sUgF',
    place: 'online',
    open: true,
    featured: false,
    tickets: 100,
    ticket_price: 5,
    guests: ['Amr Hesha', 'Jack'],
    held_on: new Date('2025-11-15T09:00:00Z').toISOString(),
  },
  {
    name: 'SQL Conf 2025',
    user_id: 'user_352NhNJMHjLhFBj1R5Jo8X2sUgF',
    place: 'online',
    open: false,
    featured: false,
    tickets: 100,
    ticket_price: 5,
    guests: ['Amr Hesha', 'Jack'],
    held_on: new Date('2025-11-01T09:00:00Z').toISOString(),
  },
];

export async function seedEvents() {
  // Check if already seeded
  const existing = await db.select().from(EventTable);
  if (existing.length > 0) {
    console.log('✅ Events already seeded');
    return;
  }

  await db.insert(EventTable).values(initialEvents);
  console.log('🌱 Events seeded successfully');
}

seedEvents()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
