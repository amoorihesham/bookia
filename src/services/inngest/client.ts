import { EventSchemas, Inngest } from 'inngest';
import { DeletedObjectJSON, UserJSON } from '@clerk/nextjs/server';
import { Stripe } from 'stripe';

type WebhookData<T> = {
  data: {
    data: T;
    raw: string;
    headers: Record<string, string>;
  };
};

export type Events = {
  'clerk/user.created': WebhookData<UserJSON>;
  'clerk/user.updated': WebhookData<UserJSON>;
  'clerk/user.deleted': WebhookData<DeletedObjectJSON>;
  'stripe/user.subscription': WebhookData<
    Stripe.Checkout.Session & { metadata: { planName?: string; userId?: string } }
  >;
  'stripe/event.booked': WebhookData<Stripe.Checkout.Session & { metadata: { productId?: string; userId?: string } }>;
};

export const inngest = new Inngest({
  id: 'bookia',
  schemas: new EventSchemas().fromRecord<Events>(),
});
