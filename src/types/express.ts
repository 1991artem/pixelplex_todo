import { Request } from 'express';

export interface IUserAuthInfoInRequest {
  token: string;
  role: string;
  userId: string;
};

export interface AuthRequest extends Request {
  user?: IUserAuthInfoInRequest | null;
}
