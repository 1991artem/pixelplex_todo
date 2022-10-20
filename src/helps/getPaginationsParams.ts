import { Response } from 'express';
import { serverMessage } from '../helps/errorHandler';
import { IQueryParams, GetPaginationsParams } from './interfaces';

const getPaginationsParams: GetPaginationsParams = (query: IQueryParams, response: Response) => {
  const skip: number = query.skip ? parseInt(query.skip) : 0;
  const limit: number = query.limit ? parseInt(query.limit) : 10;
  const page: number = query.page ? parseInt(query.page) : 1;

  if (skip*limit < 0 && page < 1) {
    serverMessage(response, 400, { message: 'Wrong query params' });
    return {
      limit: limit,
      skip: skip,
    };
  }
  return {
    limit: limit*page,
    skip: page === 1 ? skip : (limit*(page-1)),
  };
};

export default getPaginationsParams;
