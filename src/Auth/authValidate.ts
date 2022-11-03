import { checkSchema } from 'express-validator';

export default class AuthValidate {
  static  validateSigninBody = checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: 'Invalid email',
          bail: true,
        },
      },
      name: {
        isLength: {
          errorMessage: 'Invalid name',
          options: { min: 5, max: 256 },
        },
      },
      password: {
        isLength: {
          errorMessage: 'Invalid password',
          options: { min: 8, max: 256 },
        },
        isStrongPassword: {
          errorMessage: 'Invalid password',
          options: [
            { 
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1 
          }
          ],
        },
    },
    },
  )  
  static validateLoginBody = checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: 'Invalid email',
          bail: true,
        },
      },
      password: {
        isLength: {
          errorMessage: 'Invalid password',
          options: { min: 8, max: 256 },
        },
    },
    },
  )   
}
