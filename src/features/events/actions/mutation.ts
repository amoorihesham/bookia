'use server';
import { getCurrentUser } from '@/shared/lib/auth';
import eventsRepository from '../db/events.repo';
import subscriptionsRepository from '@/features/subscriptions/db/subscriptions-repo';
import { revalidatePath, updateTag } from 'next/cache';

export const toggleEventFeaturedStatus = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'No user found.' };

  const [subscription] = await subscriptionsRepository.findUserSubscription(user.clerk_id);
  if (!subscription) return { success: false, message: 'Subscription not found.' };
  if (subscription.remaining_featured_events === 0) return { success: false, message: 'Upgrade your plan.' };

  const [event] = await eventsRepository.findEventById(eventId);
  if (!event) return { success: false, message: 'Event not found.' };

  if (user.role !== 'admin' && event.user_id !== user.clerk_id) return { success: false, message: 'Access denied.' };

  const [res] = await eventsRepository.updateEvent(eventId, {
    featured: !event.featured,
    updatedAt: new Date().toISOString(),
  });
  await subscriptionsRepository.updateSubscription(subscription.id, {
    remaining_featured_events: subscription.remaining_featured_events - 1,
    updatedAt: new Date().toISOString(),
  });

  revalidatePath('/', 'page');
  updateTag('events');
  return { success: true, message: `${res.name} is now ${res.featured ? 'Featured' : 'Normal'}` };
};
