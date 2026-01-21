export const UsersMessages = {
  created: (name: string) => `User "${name}" successfully created.`,
  updated: (name: string) => `User "${name}" successfully updated.`,
  deleted: (name: string) => `User "${name}" deleted successfully.`,
};

export const UsersErrorsMessages = {
  notFound: 'The requested user could not be found.',
  alreadyExists: (name: string) => `User "${name}" already exists.`,
};
