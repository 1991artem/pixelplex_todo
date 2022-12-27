import { TASK_PRIORITY, TASK_STATUS } from 'task/constants';

export type CreateTaskBody = {
  name: string,
  description?: string,
  status?: TASK_STATUS,
  deadline?: Date,
  priority?: TASK_PRIORITY,
};

export type UpdateTaskBody = Partial<CreateTaskBody>;
