import { cacheLife, cacheTag } from 'next/cache';
import eventsRepository from '../db/events.repo';

export const GetAllEventsAction = async () => {
  await new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, 5000);
  });
  return eventsRepository.findAllEvents();
};
