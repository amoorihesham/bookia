import { cacheLife, cacheTag } from 'next/cache';
import userRepository from '../../db/user.repo';

export const GetAllUsersAction = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag('admin-users-page');
  return userRepository.findAllUsers();
};
