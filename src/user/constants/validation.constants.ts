/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ParamSchema } from 'express-validator';

const id: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
};

export { id };
