import { Router } from 'express';
import { ROLE, TASK_PRIORITY, TASK_STATUS } from './enums';


export interface IAuthRouter{
  injecting: ()=> Router;
}
export interface IUserRouter{
  injecting: ()=> Router;
}
export interface IGroupRouter{
  injecting: ()=> Router;
}
export interface ITaskRouter{
  injecting: ()=> Router;
}


export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

export type UserDTO = {
  name?: string;
  password: string;
  email: string;
}
export type GroupDTO = {
  name: string;
  description: string;
}

export type TaskDTO = {
  name: string,
  description: string,
  status: TASK_STATUS,
  deadline: Date,
  priority: TASK_PRIORITY,
}
