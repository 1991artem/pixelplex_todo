import { TASK_STATUS, TASK_PRIORITY } from "../../types/enums";

export type TaskDTO = {
  name: string,
  description: string,
  status: TASK_STATUS,
  deadline: Date,
  priority: TASK_PRIORITY,
}
