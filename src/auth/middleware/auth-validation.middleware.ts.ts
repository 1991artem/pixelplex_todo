import { checkSchema } from "express-validator";

export default class AuthParamsValidation {
    static validateSignUpBody = checkSchema({
      email: {
        normalizeEmail: {
          options:
            {'gmail_remove_dots': true,
            'all_lowercase': true},
        },
        isEmail: {
          errorMessage: 'Please enter a valid email address',
        },
        trim: true,
        escape: true,
      },
      name: {
        isLength: {
          errorMessage: 'Name should be at least 5 chars long and maximum of 256 chars',
          options: { min: 5, max: 256 },
        },
        escape: true,
        trim: true
      },
      password: {
        isLength: {
          errorMessage: 'Password should be at least 8 chars long and maximum of 256 chars',
          options: { min: 8, max: 256 },
        },
        trim: true,
        escape: true,
        isStrongPassword: {
          errorMessage: 'Please enter a valid password (ex: Password123#)',
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
    })

    static validateLoginBody = checkSchema({
      email: {
        normalizeEmail: {
          options:
            {'gmail_remove_dots': true,
            'all_lowercase': true},
        },
        isEmail: {
          errorMessage: 'Invalid email',
        },
        trim: true,
        escape: true,
      },
      password: {
        isLength: {
          errorMessage: 'Password should be at least 8 chars long and maximum of 256 chars',
          options: { min: 8, max: 256 },
        },
        trim: true,
        escape: true,
    },
    })
}
