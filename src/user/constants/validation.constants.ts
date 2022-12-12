import { ParamSchema } from 'express-validator';

const ID: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
};

export { ID };
