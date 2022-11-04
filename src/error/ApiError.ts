export class ApiError extends Error {
    details: {};
    constructor(public readonly statusCode: number, message: string, details?: {}) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.details = {};
    }

    static badRequest(message: string, details?: any) {
        return new ApiError(404, message, details)
    }

    static internal(message: string, details?: any) {
        return new ApiError(500, message, details)
    }

    static forbidden(message: string, details?: any) {
        return new ApiError(403, message, details)
    }

    static exists(message: string, details?: any) {
        return new ApiError(422, message, details)
    }
    
    static auth(message: string, details?: any) {
        return new ApiError(401, message, details)
    }
    static conflict(message: string, details?: any) {
        return new ApiError(409, message, details)
    }
}

export const isApiError = (error: unknown): error is ApiError =>{
    return error instanceof ApiError;
}
