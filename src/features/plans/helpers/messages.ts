export const PlansMessages = {
  created: (name: string) => `Plan "${name}" successfully created.`,
  updated: (name: string) => `Plan "${name}" successfully updated.`,
  booked: () => `Plan booked successfully.`,
  featured: (name: string, featured: boolean) => `Plan "${name}" is now ${featured ? 'featured' : 'normal'}`,
  opened: (name: string, open: boolean) => `Plan "${name}" is now ${open ? 'open' : 'closed'}`,
  deleted: (name: string) => `Plan "${name}" deleted successfully.`,
};

export const PlansErrorsMessages = {
  notFound: 'The requested plan could not be found.',
  notOpen: 'This plan is currently closed for bookings.',
  expired: 'This plan has already ended.',
  cannotFeatureClosed: 'Cannot feature a closed plan.',
  alreadyExists: (name: string) => `Plan "${name}" already exists.`,
};
