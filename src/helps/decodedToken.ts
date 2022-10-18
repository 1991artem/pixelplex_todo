import config from 'config';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IGetUserAuthInfoRequest, IAuthUserData, GetIdByHeaderToken } from '../helps/interfaces';
import { serverMessage } from './errorHandler';

const getIdByHeaderToken: GetIdByHeaderToken = (response: Response, request: IGetUserAuthInfoRequest) =>{
  const token: string = request.headers.authorization.split(' ')[1] // "Bearer TOKEN"
  if (!token) {
    return serverMessage(response, 401, { message: 'No authorization'})
   }
  const decoded: IAuthUserData = jwt.verify(token, config.get('jwtSecret')) // decoded TOKEN
  return decoded.userId;
}

export default getIdByHeaderToken;