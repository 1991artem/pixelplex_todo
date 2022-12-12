import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const getUserStatistics = checkSchema({ id: VALIDATION_SCHEMAS.ID });

export {
  getUserStatistics,
};
