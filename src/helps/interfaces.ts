import { Request, Response, Router } from 'express';
import { ValidationError } from 'express-validator';
import { JwtPayload } from 'jsonwebtoken';
import { Document, SchemaDefinitionProperty } from 'mongoose';

export interface IConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  connectTimeoutMS?: number;
}
export interface IAuthApi{
  authRouter: ()=> Router;
  registration_controller: (req: Request, res: Response)=>Promise<void>;
  login_controller: (req: Request, res: Response)=>Promise<void>;
  getJwtToken: (user: IUser)=>string;
}
export interface IUserApi{
  userRouter: ()=> Router;
  showUsers: ()=>void;
  showUserById: ()=>void;
  addToGroup: ()=>void;
  removeGroupFromUser: ()=>void;
  deleteUserById: ()=>void;
}
export interface IGroupApi{
  groupRouter: ()=> Router;
  createGroup: (req: Request, res: Response)=>Promise<void>;
  showGroups: ()=>void;
  showGroupById: ()=>void;
  deleteGroupById: ()=>void;
  updateGroupById: ()=>void;
  checkUsersInGroup: (group_id: string)=>Promise<IUser[]>
}
export interface ITaskApi{
  taskRouter: ()=> Router;
  addTask: ()=>void;
  showTask: ()=>void;
  showTaskById: ()=>void;
  showTaskByGroupId: ()=>void;
  deleteTaskById: ()=>void;
  updateTaskById: ()=>void;
}

export interface IUser extends Document {
  _id?: SchemaDefinitionProperty<string>;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  groups: Array<SchemaDefinitionProperty<string>>
}

export interface ITask extends Document {
  _id?: SchemaDefinitionProperty<string>;
  name: string;
  description: string;
  deadline: Date;
  priority: string;
  done: Date;
  status: string;
  owner: SchemaDefinitionProperty<string>;
}

export interface IGroup extends Document {
  _id?: SchemaDefinitionProperty<string>;
  name: string;
  description: string;
  create: Date;
  owner?: SchemaDefinitionProperty<string>;
}

export type ServerMessage = (
  res: Response,
  code: number,
  body: {
    errors?: ValidationError[];
    message: string
  }) => void;

export interface IGetUserAuthInfoRequest extends Request {
  user: string
}

export interface IAuthUserData extends JwtPayload {
  userId: string;
}

export type GetIdByHeaderToken = (
  res: Response,
  req: Request,
) => string;

export interface IQueryParams {
  name?: string;
  create?: string;
  status?: string;
  priority?: string;
  deadline?: string;
  skip?: string;
  limit?: string;
  page?: string;
  group?: string;

}

export type Sort = IGroup | IUser | ITask;

export type SortDataFunction = (
  query: IQueryParams,
  data: Sort[]
) => Sort[];
export interface IPaginationsParams{
  limit: number;
  skip: number;
}
export type GetPaginationsParams = (
  query: IQueryParams,
  response: Response
) => IPaginationsParams;

export type Autorization = (
  req: Request | IGetUserAuthInfoRequest,
  res: Response<any, Record<string, any>>,
  next: () => void
)=> any;

export type Statistic = {
  id: string,
  todo: number,
  in_progress: number,
  done: number,
  deadline_done: number,
  deadline_skip: number,
};
