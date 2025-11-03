import { UserJSON } from '@clerk/nextjs/server';
import { NonRetriableError } from 'inngest';
import { getDatabaseUser, insertUser, updateUser } from '../db/users';
import { getCurrentUser } from '@/services/clerk/lib/get-current-auth';

export function getUserPrimaryEmail(user: UserJSON) {
  const email = user.email_addresses.find((email) => email.id === user.primary_email_address_id);

  return email?.email_address ?? null;
}

export async function createUserFromWebhook(user: UserJSON) {
  try {
    const primaryEmail = getUserPrimaryEmail(user);
    if (!primaryEmail) throw new NonRetriableError('No primary email address found.');

    const newCreatedUser = await insertUser({
      id: user.id,
      username: user.username || [user.first_name, user.last_name].join('_'),
      email: primaryEmail,
      method: user.external_accounts[0].provider,
      image: user.image_url! || user.external_accounts[0].image_url!,
    });
    return newCreatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserFromWebhook(user: UserJSON) {
  try {
    const primaryEmail = getUserPrimaryEmail(user);
    if (!primaryEmail) throw new NonRetriableError('No primary email address found.');

    const newCreatedUser = await updateUser(user.id, {
      username: user.username || [user.first_name, user.last_name].join('_'),
      email: primaryEmail,
      method: user.external_accounts[0].provider,
      image: user.image_url || user.external_accounts[0].image_url,
    });
    return newCreatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUserRole() {
  const { userId } = await getCurrentUser();
  const user = await getDatabaseUser(userId!);
  console.log('DB_USER', user);

  return user?.role;
}
