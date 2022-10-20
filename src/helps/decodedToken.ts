import { verify } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { IAuthUserData, GetIdByHeaderToken } from '../helps/interfaces';
import { serverMessage } from './errorHandler';

const getIdByHeaderToken: GetIdByHeaderToken = (response: Response, request: Request) => {
  const token: string = request?.headers?.authorization?.split(' ')[1] as string; // "Bearer TOKEN"
  if (!token || !process.env.JWT_SECRET) {
    serverMessage(response, 401, { message: 'No authorization' });
  }
  const decoded: IAuthUserData = verify(token, process.env.JWT_SECRET as string) as IAuthUserData; // decoded TOKEN
  return decoded.userId;
};

export default getIdByHeaderToken;
