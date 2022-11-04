import { Response, Request, NextFunction } from 'express';
import { isApiError } from '../error/ApiError';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (isApiError(error)) {
        const { message, statusCode, details } = error;
        res.status(statusCode).json({ message, statusCode, details });
        return;
    }
    console.error(error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
}

export default errorHandler;