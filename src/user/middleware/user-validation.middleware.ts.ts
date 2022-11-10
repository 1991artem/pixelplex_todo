import { Schema } from 'express-validator';

export default class UserParamsValidation {
  static  validationUserParamsId: Schema = {
      id: {
        in: ['params'],
        trim: true,
        isInt: true,
        toInt: true,
        escape: true,
        errorMessage: 'ID is wrong',
      }
    }
}
