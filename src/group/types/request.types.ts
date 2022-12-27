import { Request } from 'express';

import { CreateGroupBody, UpdateGroupBody, UserInGroupBody } from './body.types';
import { UpdateGroupParams, DeleteGroupParams, GetOneParams } from './params.types';
import { GetAllQueryParams } from './query.types';

export type GetAllGroupRequest = Request<GetAllQueryParams>;

export type GetOneRequest = Request<GetOneParams>;

export type UserInGroupRequest = Request<unknown, unknown, UserInGroupBody>;

export type CreateGroupRequest = Request<unknown, unknown, CreateGroupBody>;

export type UpdateGroupRequest = Request<UpdateGroupParams, unknown, UpdateGroupBody>;

export type DeleteGroupRequest = Request<DeleteGroupParams>;
