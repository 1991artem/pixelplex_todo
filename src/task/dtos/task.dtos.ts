import { TASK_PRIORITY, TASK_STATUS } from 'task/constants';

export interface TaskDTO {
  name: string,
  description: string,
  status: TASK_STATUS,
  deadline: Date,
  priority: TASK_PRIORITY,
};
