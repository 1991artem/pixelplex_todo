import { checkSchema } from 'express-validator';

const idParams = checkSchema({
  id: {
    in: ['params'],
    trim: true,
    isInt: true,
    escape: true,
    errorMessage: 'ID is invalid',
  },
});

export {
  idParams,
};
