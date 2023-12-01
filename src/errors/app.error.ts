/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
export class AppError extends Error {
  constructor(public readonly statusCode: number, message: string, details?: {}) {
    super(message);
  }
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
