import eventsRepository from '../db/events.repo';

export const GetEventsAction = async (term: 'all' | 'featured' | 'today' | 'expired' = 'all') => {
  switch (term) {
    case 'all':
      return eventsRepository.findAllEvents();
    case 'today':
      return eventsRepository.findAllTodayEvents();
    case 'expired':
      return eventsRepository.findAllExpiredEvents();
    case 'featured':
      return eventsRepository.findAllFeaturedEvents();
    default:
      return eventsRepository.findAllEvents();
  }
};
