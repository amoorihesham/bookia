import { serve } from 'inngest/next';
import { inngest } from '@/services/inngest/client';
import { clerkCreatedUser, clerkDeletedUser } from '@/services/inngest/functions/clerk';
import { stripeUserSubscription, stripeUserBookedEvent } from '@/services/inngest/functions/stripe';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [clerkCreatedUser, clerkDeletedUser, stripeUserSubscription, stripeUserBookedEvent],
});
