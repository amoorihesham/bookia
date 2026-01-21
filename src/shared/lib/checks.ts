import { DatabaseUser } from '@/features/users/types';

export function isAdmin(user: DatabaseUser) {
  return user.role === 'admin';
}
