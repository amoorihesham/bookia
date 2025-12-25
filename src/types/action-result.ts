/**
 * Generic action result type for server actions
 * Provides a discriminated union for success and error cases
 */

export type ActionSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ActionError = {
  success: false;
  message: string;
  errors: string | string[];
};

export type ActionResult<T> = ActionSuccess<T> | ActionError;
