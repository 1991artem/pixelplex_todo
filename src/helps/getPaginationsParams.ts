import { Response } from 'express';
import { serverMessage } from '../helps/errorHandler';
import { IQueryParams, GetPaginationsParams } from './interfaces';

const getPaginationsParams: GetPaginationsParams = (query: IQueryParams, response: Response) => {
  const { skip = '0', limit = '10', page = '1' } = query;
  if (+skip*+limit < 0 && +page < 1) {
    serverMessage(response, 400, { message: 'Wrong query params' });
    return {
      limit: +limit,
      skip: +skip,
    };
  }
  return {
    limit: parseInt(limit)*parseInt(page),
    skip: page === '1' ? parseInt(skip) : (parseInt(limit)*(parseInt(page)-1)),
  };
};

export default getPaginationsParams;
