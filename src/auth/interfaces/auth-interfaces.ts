import { Request } from 'express';
import { UserCreateDTO } from '@user';
import { UserAuthDTO } from 'auth/dtos/auth.dtos';

export interface LoginRequest extends Request {
  body: UserAuthDTO;
}

export interface SignUpRequest extends Request {
  body: UserCreateDTO;
}

