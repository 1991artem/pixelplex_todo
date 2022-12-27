import { Request } from 'express';
/*
1. Params
2. Response
3. Body
4. Query
*/

import { CreateGroupBody, UpdateGroupBody, UserInGroupBody } from './body.types';
import { UpdateGroupParams, DeleteGroupParams, GetOneParams } from './params.types';
import { GetAllQuery } from './query.types';

export type GetAllGroupRequest = Request<GetAllQuery>;

export type GetOneRequest = Request<GetOneParams>;

export type UserInGroupRequest = Request<unknown, unknown, UserInGroupBody>;

export type CreateGroupRequest = Request<unknown, unknown, CreateGroupBody>;

export type UpdateGroupRequest = Request<UpdateGroupParams, unknown, UpdateGroupBody>;

export type DeleteGroupRequest = Request<DeleteGroupParams>;
