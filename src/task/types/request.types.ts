import { Request } from 'express';

import { CreateTaskBody, UpdateTaskBody } from './body.types';
import { UpdateTaskParams, DeleteTaskParams } from './params.types';
import { GetAllQueryParams } from './query.types';

export type GetAllTaskRequest = Request<GetAllQueryParams>;

export type CreateTaskRequest = Request<unknown, unknown, CreateTaskBody>;

export type UpdateTaskRequest = Request<UpdateTaskParams, unknown, UpdateTaskBody>;

export type DeleteTaskRequest = Request<DeleteTaskParams>;
