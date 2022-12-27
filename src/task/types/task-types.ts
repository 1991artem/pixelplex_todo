import { Task } from '../entity/task.entity';

export type QueryParams = {
  limit: number | undefined;
  offset: number | undefined;
  type: string | undefined;
  field: string | undefined;
};

export type GetAllTaskResponse = {
  amount: number,
  tasks: Task[]
};

export type GetTaskByIdParams = {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<Task>[],
};
