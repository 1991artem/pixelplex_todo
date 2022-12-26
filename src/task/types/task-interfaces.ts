import { Request } from 'express';
import { CreateTaskDTO, UpdateTaskDTO } from 'task/dtos/task.dtos';
import { Task } from '../entity/task.entity';

export interface IGetAllTaskResponse {
  amount: number,
  tasks: Task[]
};

export interface ITaskQueryParams {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string;
};

export interface IGetTaskById {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<Task>[],
}

export interface CreateTaskRequest extends Request {
  body: CreateTaskDTO;
}

export interface UpdateTaskRequest extends Request {
  params: {
    id: string;
  };
  body: UpdateTaskDTO;
}

export interface GetAllTaskRequest extends Request {
  body: UpdateTaskDTO;
}

export interface DeleteTaskRequest extends Request {
  params: {
    id: string;
  };
}
