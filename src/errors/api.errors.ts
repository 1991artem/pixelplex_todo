export class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string, details?: {}) {
    super(message);
  }

  static DAD_REQUEST(message?: string, details?: any) {
    const error_message = message ? message : 'Not Found';
    return new ApiError(400, error_message, details);
  }

  static UNAUTHORIZEN(message?: string, details?: any) {
    const error_message = message ? message : 'Unauthorizen';
    return new ApiError(401, error_message, details);
  }

  static FORBIDDEN(message?: string, details?: any) {
    const error_message = message ? message : 'Forbidden';
    return new ApiError(403, error_message, details);
  }

  static NOT_FOUND(message?: string, details?: any) {
    const error_message = message ? message : 'Not Found';
    return new ApiError(404, error_message, details);
  }

  static UNPROCESSABLE_ENTITY(message?: string, details?: any) {
    const error_message = message ? message : 'Unprocessable Entity';
    return new ApiError(422, error_message, details);
  }

  static INTERNAL_SERVER_ERROR(message?: string, details?: any) {
    const error_message = message ? message : 'Server Error';
    return new ApiError(500, error_message, details);
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
