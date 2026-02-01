'use server';
import { cacheLife, cacheTag } from 'next/cache';
import plansRepository from '../db/plans.repo';

export const getAllPlansAction = async () => {
  'use cache';
  cacheLife('days');
  cacheTag('plans');

  return plansRepository.findAllPlans();
};
