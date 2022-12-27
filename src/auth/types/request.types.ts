import { Request } from 'express';
import { CreateUserBody, UserAuthBody } from './body.types';
/*
1. Params
2. Response
3. Body
4. Query
*/

export type SignUpRequest = Request<unknown, unknown, CreateUserBody>;

export type LoginRequest = Request<unknown, unknown, UserAuthBody>;
