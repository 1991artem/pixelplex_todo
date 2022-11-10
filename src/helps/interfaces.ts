import { Router } from 'express';


export interface IAuthRouter{
  injecting: ()=> Router;
}
export interface IUserRouter{
  injecting: ()=> Router;
}
export interface IGroupRouter{
  injecting: ()=> Router;
}

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
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
