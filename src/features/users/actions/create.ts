import userRepository from '../db/user.repo';
import { UserTable } from '@/drizzle/schema';

export const CreateUserAction = async (payload: typeof UserTable.$inferInsert) => {
  return userRepository.insertNewUser(payload);
};
