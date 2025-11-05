import { EventTable } from '@/drizzle/schema';

export const EventCard = ({}: typeof EventTable.$inferSelect) => {
  return <div>Event Card</div>;
};
