import { Request } from 'express';
import { CreateUserBody, UserAuthBody } from './body.types';

export type SignUpRequest = Request<unknown, unknown, CreateUserBody>;

export type LoginRequest = Request<unknown, unknown, UserAuthBody>;
