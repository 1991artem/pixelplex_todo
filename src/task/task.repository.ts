import { AppDataSource } from '../data-source';
import { Task } from './entity/task.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos/task.dtos';
import { TaskType } from './types/task-types';
import { ITaskQueryParams } from './types/task-interfaces';
import { In } from 'typeorm';

export class TaskRepository {
  private static _tasksRepository = AppDataSource.getRepository(Task);
  static async findOneById(id: number): Promise<Task | null> {
    const task: TaskType = await this._tasksRepository.findOneBy({
      id,
    });
    return task;
  }

  static async getTaskByName(name: string): Promise<Task | null> {
    const task: TaskType = await this._tasksRepository.findOneBy({
      name,
    });
    return task;
  }

  static async createTask(taskDTO: CreateTaskDTO): Promise<Task> {
    const task: Task = this._tasksRepository.create(taskDTO);
    await this._tasksRepository.save(task);
    return task;
  }

  static async getAllTasksByUserId(userId: number, params: ITaskQueryParams): Promise<Task[]> {
    const { limit, offset, field, type } = params;
    const tasks: Task[] = await this._tasksRepository.find({
      where: {
        user: {
          id: userId,
        }
      },
      skip: offset,
      take: limit,
      order: {
        [field]: type,
      },
    });
    return tasks;
  }

  static async getAllGroupmatesTasks(groupIds: number[], filterId: number | undefined, params: ITaskQueryParams): Promise<Task[]> {
    const { limit, offset, field, type } = params;
    const tasks: Task[] = await this._tasksRepository.find({
      where: {
        user: {
          id: filterId,
          groups: {
            id: In(groupIds),
          },
        }
      },
      skip: offset,
      take: limit,
      order: {
        [field]: type,
      },
    });
    return tasks;
  }
  
  static async updateTaskById(id: number, updateBody: Partial<UpdateTaskDTO>): Promise<void> {
    await this._tasksRepository
      .createQueryBuilder()
      .update(Task)
      .set({ ...updateBody })
      .where('id = :id', { id })
      .execute();
  }
  static async deleteTask(task: Task): Promise<void> {
    await this._tasksRepository.remove(task);
  }
}
