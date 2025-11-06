import { cacheLife } from 'next/cache';
import eventsRepository from '../db/events.repo';

export const GetAllEventsAction = async () => {
  'use cache';
  cacheLife('minutes');
  return eventsRepository.findAllEvents();
};

export const GetTodayEventsAction = async () => {
  return eventsRepository.findAllTodayEvents();
};

export const GetExpiredEventsAction = async () => {
  return eventsRepository.findAllExpiredEvents();
};
