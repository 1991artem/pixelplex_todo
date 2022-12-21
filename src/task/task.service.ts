import { AppError } from '@errors';
import { Group } from '@group';
import { UserRepository, UserType } from '@user';
import { STATUS_CODE } from '@constants';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos/task.dtos';
import { Task } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { IGetAllTaskResponse, ITaskQueryParams } from './types/task-interfaces';
import { QueryType, TaskType } from './types/task-types';

export default class TaskService {
  static async createTask(taskDTO: CreateTaskDTO): Promise<Task> {
    const task: TaskType = await TaskRepository.getTaskByName(taskDTO.name);
    if (task) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'Task already exists',
      );
    }
    if (taskDTO.deadline){
      const createTaskDTO: CreateTaskDTO = {...taskDTO, ...{deadline: new Date(taskDTO?.deadline) } }
      return await TaskRepository.createTask(createTaskDTO);
    }
    return await TaskRepository.createTask(taskDTO);
  }
  static async getAllTasks(queryParams: Partial<QueryType>, userId: string | undefined): Promise<IGetAllTaskResponse | undefined> {
    const { pagination, sort, filter, includeGroupmatesTasks } = queryParams;
    const params: ITaskQueryParams = {
      limit: Number(pagination?.limit) || 10,
      offset: Number(pagination?.offset) || 0,
      type: sort?.type?.toUpperCase(),
      field: sort?.field?.toLowerCase() || 'name',
    };
    if (userId) {
      const filterId = filter?.user ? +filter?.user : undefined;
      const tasks: Task[] = includeGroupmatesTasks !== 'true' ?
      await TaskRepository.getAllTasksByUserId(+userId, params) 
      : await this.getAllGroupmatesTasks(+userId, params, filterId);

      if (!tasks.length) {
        throw new AppError(STATUS_CODE.NOT_FOUND,
          'Tasks not found',
        );
      }
      const allTaskResponse: IGetAllTaskResponse = {
        amount: tasks.length,
        tasks: tasks,
      };
      return allTaskResponse;
    }
  }

  static async deleteTaskById(id: string): Promise<void> {
    const task: TaskType = await TaskRepository.findOneById(+id);
    if (!task) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not found',
      );
    }
    await TaskRepository.deleteTask(task)
  }
  static async updateTaskById(id: string, updateBody: Partial<UpdateTaskDTO>): Promise<Task> {
    const task: TaskType = await TaskRepository.findOneById(+id);
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
    if (updateBody.deadline){
      updateBody = {...updateBody, ...{deadline: new Date(updateBody.deadline) } }
    }
    await TaskRepository.updateTaskById(+id, updateBody);
    const updatedTask: TaskType = await TaskRepository.findOneById(+id);
    if (!updatedTask) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Task not updated',
      );
    }
    return updatedTask;
  }
  static async getAllGroupmatesTasks(userId: number, params: ITaskQueryParams, filterId: number | undefined): Promise<Task[]>{
    const user: UserType = await UserRepository.getUserByIdWithGroup(+userId);
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
