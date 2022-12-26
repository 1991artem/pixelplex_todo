import { Request } from 'express';

export interface GetUserStatisticsRequesr extends Request {
  params: {
    id: string;
  }
}
