import { Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  groups: Array<Types.ObjectId>
}

export interface ITask extends Document {
  _id?: string;
  name: string;
  description: string;
  deadline: Date;
  priority: string;
  status: string;
  owner: Types.ObjectId;
}

export interface IGroup extends Document {
  _id?: string;
  name: string;
  description: string;
  create: Date;
  owner: Types.ObjectId;
}

export type ServerMessage = (
  res: Response,
  startus: number,
  body: {
    errors?: ValidationError[],
    message: string
  }) => void;

  export interface IGetUserAuthInfoRequest extends Request {
    user: IAuthUserData
  }

  export interface IAuthUserData {
    userId: string;
    iat: number;
    exp: number;
  }

  export type GetIdByHeaderToken = (
    res: Response,
    req: IGetUserAuthInfoRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => string | ServerMessage;

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

    type ResponseData = IGroup[] | IUser[] | ITask[]

    export type SortDataFunction = (
      query: IQueryParams,
      data: ResponseData
      ) => ResponseData;
export interface IPaginationsParams{
  limit: number;
  skip: number;
}
      export type GetPaginationsParams = (
        query: IQueryParams,
        response: Response
        ) => IPaginationsParams | ServerMessage;
