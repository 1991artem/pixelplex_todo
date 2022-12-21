import { Task } from "../entity/task.entity";

export type TaskType = Task | null;

export type QueryType = {
    paginations?: {
      limit: number,
      offset: number,
    },
    sort?: {
      type: string | undefined;
      field: string;
    },
    filter?: {
      user: string;
    },
    includeGroupmatesTasks?: string
  };
