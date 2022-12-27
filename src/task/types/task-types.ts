import { Task } from '../entity/task.entity';

export type TaskType = Task | null;

export type QueryParams = {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string | undefined;
};

export type GetAllTaskResponse = {
  amount: number,
  tasks: Task[]
};

export type GetTaskById = {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<Task>[],
};
