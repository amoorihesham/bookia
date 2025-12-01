import { inngest } from '../client';

export const stripeCheckoutSessionCompleted = inngest.createFunction(
  { id: 'stripe/update-db-after-checkout-completed', name: 'Stripe - Update User Subscription' },
  { event: 'stripe/webhook_recived' },
  async ({ event, step }) => {
    console.log(event.data.headers['Stripe-Signature']);
  }
);
