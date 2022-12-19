import { Task } from "../entity/task.entity";

  export interface IGetAllTaskResponse {
    amount: number,
    tasks: Task[]
  };
  
  export interface ITaskPaginationsParams {
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
  
  export type QueryPaginationType = {
    paginations: {
      limit: number,
      offset: number,
    },
    sort: {
      type: string | undefined;
      field: string;
    }
  };
  