export class AppError extends Error {
  constructor(public readonly statusCode: number, message: string, details?: {}) {
    super(message);
  }
}

export const isApiError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
