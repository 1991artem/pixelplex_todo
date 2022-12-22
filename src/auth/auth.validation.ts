import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const signUp = checkSchema({
  email: VALIDATION_SCHEMAS.EMAIL,
  name: {
    isLength: {
      errorMessage: 'Name should be at least 5 chars long and maximum of 256 chars',
      options: { min: 5, max: 256 },
    },
    escape: true,
    trim: true,
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long and maximum of 256 chars',
      options: { min: 8, max: 256 },
    },
    trim: true,
    escape: true,
    isStrongPassword: {
      errorMessage: 'Please enter a valid password (ex: Password123#)(minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1)',
      options: [
        {
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1,
        },
      ],
    },
  },
});

const login = checkSchema({
  email: VALIDATION_SCHEMAS.EMAIL,
  password: {
    isLength: {
      errorMessage: 'Password equired',
      options: { min: 1 },
    },
    trim: true,
    escape: true,
  },
});

export {
  signUp,
  login,
};
