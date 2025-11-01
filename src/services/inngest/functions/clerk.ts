import { inngest } from '../client';
import { deleteUser } from '@/features/users/db/users';
import { createNewSubscription } from '@/features/subscriptions/db';
import { createUserFromWebhook, updateUserFromWebhook } from '@/features/users/lib';
import { verifyWebhook } from '../lib';

export const clerkCreatedUser = inngest.createFunction(
  {
    id: 'clerk/create-db-user',
    name: 'Clerk - Create Database User',
  },
  {
    event: 'clerk/user.created',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', () => verifyWebhook(event.data));

    const user = await step.run('create-user', () => createUserFromWebhook(event.data.data));

    await step.run('create-user-subscription', () => createNewSubscription(user!));
  }
);

export const clerkUpdatedUser = inngest.createFunction(
  {
    id: 'clerk/update-db-user',
    name: 'Clerk = Update Database User',
  },
  {
    event: 'clerk/user.updated',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', () => verifyWebhook(event.data));
    await step.run('update-user', () => updateUserFromWebhook(event.data.data));
  }
);

export const clerkDeletedUser = inngest.createFunction(
  {
    id: 'clerk/delete-db-user',
    name: 'Clerk = Delete Database User',
  },
  {
    event: 'clerk/user.deleted',
  },
  async ({ event, step }) => {
    await step.run('verify-webhook', () => verifyWebhook(event.data));
    await step.run('delete-user', () => deleteUser(event.data.data.id!));
  }
);
