import { Request } from 'express';
/*
1. Params
2. Response
3. Body
4. Query
*/

import { CreateTaskBody, UpdateTaskBody } from './body.types';
import { UpdateTaskParams, DeleteTaskParams } from './params.types';
import { GetAllQuery } from './query.types';

export type GetAllTaskRequest = Request<GetAllQuery>;

export type CreateTaskRequest = Request<unknown, unknown, CreateTaskBody>;

export type UpdateTaskRequest = Request<UpdateTaskParams, unknown, UpdateTaskBody>;

export type DeleteTaskRequest = Request<DeleteTaskParams>;
