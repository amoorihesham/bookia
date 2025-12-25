/**
 * Generic action result type for server actions
 * Provides a discriminated union for success and error cases
 */

export type ActionResult<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: string | string[];
};
