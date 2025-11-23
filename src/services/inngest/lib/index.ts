import { env } from '@/data/env/server';
import { NonRetriableError } from 'inngest';
import { Webhook } from 'svix';

export function verifyWebhook({
  raw,
  headers,
}: {
  raw: string;
  headers: Record<string, string>;
}) {
  try {
    return new Webhook(env.CLERK_SECRET_WEBHOOK_KEY).verify(raw, headers);
  } catch {
    throw new NonRetriableError('Invalid webhook');
  }
}
