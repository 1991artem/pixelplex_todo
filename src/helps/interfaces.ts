import { Router, Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { Document, SchemaDefinitionProperty } from 'mongoose';

export interface IConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  connectTimeoutMS?: number;
}

export interface IUser extends Document {
  _id?: SchemaDefinitionProperty<string>;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  groups: Array<SchemaDefinitionProperty<string>>
}

export interface IAuthApi{
  authRouter: ()=> Router;
  registration_controller: (req: Request, res: Response)=>Promise<void>;
  login_controller: (req: Request, res: Response)=>Promise<void>;
}

export type ServerMessage = (
  res: Response,
  code: number,
  body: {
    errors?: ValidationError[];
    message: string
  }) => void;
