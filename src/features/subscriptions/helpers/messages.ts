export const SubscriptionsMessages = {
  created: (name: string) => `Subscription "${name}" successfully created.`,
  updated: (name: string) => `Subscription "${name}" successfully updated.`,
  deleted: (name: string) => `Subscription "${name}" deleted successfully.`,
  toggled: (name: string, status: boolean) => `Subscription "${name}" is now ${status ? 'active' : 'inactive'}`,
};

export const SubscriptionsErrorsMessages = {
  notFound: 'The requested subscription could not be found.',
  notOpen: 'This subscription is currently closed for bookings.',
  expired: 'This subscription has already ended.',
  cannotFeatureClosed: 'Cannot feature a closed subscription.',
  alreadyExists: (name: string) => `Subscription "${name}" already exists.`,
};
