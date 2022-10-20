/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, RequestHandler, Response, Request } from 'express';
import getIdByHeaderToken from '../helps/decodedToken';
import { IGetUserAuthInfoRequest } from '../helps/interfaces';

const autorization: RequestHandler = (req: Request | IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    (req as IGetUserAuthInfoRequest).user = getIdByHeaderToken(res, req) as string; // return user ID
    next();

  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default autorization;
