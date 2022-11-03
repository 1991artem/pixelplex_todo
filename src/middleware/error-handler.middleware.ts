import { Response, Request, NextFunction } from 'express';

const ApiError = require('../error/ApiError');

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Server Error'})
}

export default errorHandler;