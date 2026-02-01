'use server';
import { cacheLife, cacheTag } from 'next/cache';
import subscriptionsRepository from '../db/subscriptions-repo';

export const GetAllSubscriptions = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag('admin-subscriptions-page');
  return subscriptionsRepository.findAll();
};
