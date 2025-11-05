import { UserJSON } from '@clerk/nextjs/server';

export function createUsername(payload: UserJSON): string {
  if (payload.username) return payload.username;
  const nameParts = [payload.first_name, payload.last_name].filter(Boolean);
  return nameParts.join('_') || 'user';
}
