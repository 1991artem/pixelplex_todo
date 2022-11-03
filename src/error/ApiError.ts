export class ApiError extends Error {
    constructor(public readonly statusCode: number, message: string) {
        super(message);
    }

    static badRequest(message: string) {
        return new ApiError(404, message)
    }

    static internal(message: string) {
        return new ApiError(500, message)
    }

    static forbidden(message: string) {
        return new ApiError(403, message)
    }

    static exists(message: string) {
        return new ApiError(422, message)
    }
    
    static auth(message: string) {
        return new ApiError(401, message)
    }
}

export const isAppError = (error: unknown): error is ApiError =>{
    return error instanceof ApiError;
}
