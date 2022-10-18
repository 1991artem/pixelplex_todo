import config from 'config';
import { verify } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { IAuthUserData, GetIdByHeaderToken } from '../helps/interfaces';
import { serverMessage } from './errorHandler';

const getIdByHeaderToken: GetIdByHeaderToken = (response: Response, request: Request) => {
  const token: string = request?.headers?.authorization?.split(' ')[1] as string; // "Bearer TOKEN"
  if (!token) {
    serverMessage(response, 401, { message: 'No authorization' });
  }
  const decoded: IAuthUserData = verify(token, config.get('jwtSecret')) as IAuthUserData; // decoded TOKEN
  return decoded.userId;
};

export default getIdByHeaderToken;
