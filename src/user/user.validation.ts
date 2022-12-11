import { checkSchema } from 'express-validator';
import { id } from './constants';

const getUserStatistics = checkSchema({ id });

export {
  getUserStatistics,
};
