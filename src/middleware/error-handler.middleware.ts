import { Response, Request, NextFunction } from 'express';
import { isAppError } from '../error/ApiError';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (isAppError(error)) {
        const { message, statusCode } = error;
        res.status(statusCode).json({ message, statusCode });
        return;
    }
    console.error(error);
    res.status(500).json({ message: 'Server error', statusCode: 500 });
}

export default errorHandler;