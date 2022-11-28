import { checkSchema } from 'express-validator';

export default class UserParamsValidation {
  static  validationUserParamsId = checkSchema({
      id: {
        in: ['params'],
        trim: true,
        isInt: true,
        escape: true,
        errorMessage: 'ID is wrong',
      }
    })
}
