import { Schema } from 'express-validator';

export default class UserValidation {
  static  validationUserParamsId: Schema = {
      id: {
        in: ['params'],
        trim: true,
        isInt: true,
        toInt: true,
        unescape: true,
        errorMessage: 'ID is wrong',
      }
    }
}
