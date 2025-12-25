export const EventsMessages = {
  created: (name: string) => `Event "${name}" successfully created.`,
  booked: () => `Event booked successfully.`,
  featured: (name: string, featured: boolean) => `Event "${name}" is now ${featured ? 'featured' : 'normal'}`,
  opened: (name: string, open: boolean) => `Event "${name}" is now ${open ? 'open' : 'closed'}`,
  deleted: (name: string) => `Event "${name}" deleted successfully.`,
};

export const EventsErrorsMessages = {
  notFound: 'The requested event could not be found.',
  notOpen: 'This event is currently closed for bookings.',
  expired: 'This event has already ended.',
  cannotFeatureClosed: 'Cannot feature a closed event.',
};
