import { env } from '@/data/env/server';
import { inngest } from '@/services/inngest/client';
import { stripe } from '@/services/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session & {
        metadata: Record<string, string>;
      };
      await inngest.send({
        name: event.data.object.metadata?.planName ? 'stripe/user.subscription' : 'stripe/event.booked',
        data: { data: session, raw: rawBody, headers: Object.fromEntries(req.headers) },
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      console.log(error.name, error.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
