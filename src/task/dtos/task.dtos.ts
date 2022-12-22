import { TASK_PRIORITY, TASK_STATUS } from 'task/constants';

export interface CreateTaskDTO {
  name: string,
  description?: string,
  status?: TASK_STATUS,
  deadline?: Date,
  priority?: TASK_PRIORITY,
};

export interface UpdateTaskDTO {
  name?: string,
  description?: string,
  status?: TASK_STATUS,
  deadline?: Date,
  priority?: TASK_PRIORITY,
};
