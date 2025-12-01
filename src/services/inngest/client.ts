import { EventSchemas, Inngest } from 'inngest';
import { DeletedObjectJSON, UserJSON } from '@clerk/nextjs/server';
import stripe from 'stripe';

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
  'stripe/webhook_recived': WebhookData<stripe.ResponseEvent>;
};

export const inngest = new Inngest({
  id: 'bookia',
  schemas: new EventSchemas().fromRecord<Events>(),
});
