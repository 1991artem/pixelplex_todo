import { Task } from '../entity/task.entity';

export interface IGetAllTaskResponse {
  amount: number,
  tasks: Task[]
};

export interface ITaskQueryParams {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string | undefined;
};

export interface IGetTaskById {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<Task>[],
}

export interface TaskWithIdRequest {
  id: string;
}
