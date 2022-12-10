import { Request } from 'express';
import { IUserAuthInfoInRequest } from './types';

export interface AuthRequest extends Request {
  user?: IUserAuthInfoInRequest | null;
}
