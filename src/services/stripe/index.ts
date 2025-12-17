import { env } from '@/data/env/server';
import { Stripe } from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

type StripeEventItem = {
  eventId: string;
  tickets: number;
  price: number;
  name: string;
  thumbnail: string;
};

export const createStripeCheckoutSessionForEvent = async (event: StripeEventItem) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: event.tickets,
        price_data: {
          currency: 'usd',
          unit_amount: event.price * 100,
          product_data: {
            name: `${event.name} - Event Ticket`,
            images: [event.thumbnail],
          },
        },
      },
    ],
    metadata: {
      eventId: event.eventId,
      name: event.name,
      tickets: event.tickets,
    },

    success_url: `${env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BASE_URL}/`,
  });

  return session.url;
};
