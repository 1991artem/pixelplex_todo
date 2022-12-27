import { AppError } from '@errors';
import { Group } from '@group';
import { User, UserRepository } from '@user';
import { STATUS_CODE } from '@constants';
import { Task } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { GetAllTaskResponse, QueryParams } from './types/task-types';
import { CreateTaskBody, UpdateTaskBody } from './types/body.types';
import { GetAllQueryParams } from './types/query.types';

export class TaskService {
  static async createTask(taskDTO: CreateTaskBody, userId: string): Promise<Task> {
    const task: Task | null = await TaskRepository.getTaskByName(taskDTO.name);
    if (task) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'Task already exists',
      );
    }
    const user: User = await UserRepository.findOneById(Number(userId)) as User;

    if (taskDTO.deadline) {
      const createTaskDTO: CreateTaskBody = { ...taskDTO, ...{ deadline: new Date(taskDTO?.deadline) } };
      return TaskRepository.createTask(createTaskDTO, user);
    }
    return TaskRepository.createTask(taskDTO, user);
  }

  static async getAllTasks(queryParams: Partial<GetAllQueryParams>, userId: string): Promise<GetAllTaskResponse | undefined> {
    const { pagination, sort, filter, includeGroupmatesTasks } = queryParams;
    const params: QueryParams = {
      limit: pagination?.limit ? Number(pagination?.limit) : undefined,
      offset: pagination?.offset ? Number(pagination?.offset) : undefined,
      type: sort?.type ? sort?.type.toUpperCase() : undefined,
      field: sort?.field ? sort?.field.toLowerCase() : undefined,
    };
    const filterId = filter?.user ? Number(filter?.user) : undefined;
    const tasks: Task[] = includeGroupmatesTasks !== 'true' ?
      await TaskRepository.getAllTasksByUserId(Number(userId), params)
      : await this.getAllGroupmatesTasks(Number(userId), params, filterId);

    if (!tasks.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Tasks not found',
      );
    }
    const allTaskResponse: GetAllTaskResponse = {
      amount: tasks.length,
      tasks: tasks,
    };
    return allTaskResponse;
  }

  static async deleteTaskById(id: string): Promise<void> {
    const task: Task | null = await TaskRepository.findOneById(Number(id));
    if (!task) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not found',
      );
    }
    await TaskRepository.deleteTask(task);
  }
  static async updateTaskById(id: string, updateBody: UpdateTaskBody): Promise<Task> {
    const task: Task | null = await TaskRepository.findOneById(Number(id));
    if (!task) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not found',
      );
    }
    if (updateBody.name === task.name) {
      throw new AppError(STATUS_CODE.BAD_REQUEST,
        'Name must be unique. Change name',
      );
    }
    if (updateBody.deadline) {
      updateBody = { ...updateBody, ...{ deadline: new Date(updateBody.deadline) } };
    }
    const updatedTask: Task | null = await TaskRepository.updateTaskById(Number(id), updateBody);
    if (!updatedTask) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not updated',
      );
    }
    return updatedTask;
  }
  static async getAllGroupmatesTasks(userId: number, params: QueryParams, filterId: number | undefined): Promise<Task[]> {
    const user: User | null = await UserRepository.getUserByIdWithGroup(Number(userId));
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'User not found',
      );
    }
    const groupIds: number[] = user.groups.map((group: Group) => group.id);
    const tasks: Task[] = await TaskRepository.getAllGroupmatesTasks(groupIds, filterId, params);
    return tasks;
  }
}
