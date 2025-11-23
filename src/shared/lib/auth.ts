import userRepository from '@/features/users/db/user.repo';
import { auth, UserJSON } from '@clerk/nextjs/server';

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return userRepository.findUserById(userId);
}

export function getUserPrimaryEmail(user: UserJSON) {
  const email = user.email_addresses.find(email => email.id === user.primary_email_address_id);

  return email?.email_address ?? null;
}
