import { Router } from 'express';
import { Document, SchemaDefinitionProperty } from 'mongoose';

export interface IConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  serverSelectionTimeoutMS?: number;
  maxPoolSize?: number;
}

export interface IUser extends Document {
  _id?: SchemaDefinitionProperty<string>;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  groups: Array<SchemaDefinitionProperty<string>>
}

export type UserType = IUser | null;

export interface IAuthRouter{
  authRouter: ()=> Router;
}
export type AuthParams = {
  name?: string;
  password: string;
  email: string;
}
