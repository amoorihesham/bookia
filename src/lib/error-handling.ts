import { ZodError } from 'zod';

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return {
      success: false,
      message: error.message,
      errors: error.issues.map(e => e.message),
    };
  }

  if (error instanceof Error) {
    return { success: false, message: error.message, errors: [] };
  }

  return {
    success: false,
    message: (error as Error)?.message || 'Internal error',
    errors: [],
  };
}
