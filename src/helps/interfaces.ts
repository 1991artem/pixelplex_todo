import { Router } from 'express';
import { Model, Optional } from 'sequelize';

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UserCreationAttributes = Optional<IUser, 'id'>;

export interface IAuthRouter{
  authRouter: ()=> Router;
}
export type AuthParams = {
  name?: string;
  password: string;
  email: string;
}
