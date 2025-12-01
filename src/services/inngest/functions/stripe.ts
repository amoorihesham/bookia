
import { headers } from 'next/headers';
import { inngest } from '../client';
import { stripe } from '@/services/stripe';
import { env } from '@/data/env/server';


export const stripeCheckoutSessionCompleted = inngest.createFunction(
    { id: 'stripe/update-db-after-checkout-completed', name: 'Stripe - Update User Subscription' },
    { event: 'stripe/webhook_recived' },
    async ({ event, step }) => {

        console.log(event.data.headers['Stripe-Signature']);


    }
);
