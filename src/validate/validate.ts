import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

export default class Validate {
  static  validateSigninBody: ValidationChain[] = [
      body('email', 'Incorrect email')
        .escape()
        .isEmail(), // validation email
      body('password', 'Minimum password length 8 characters and maximum password length 256 characters') // validation Password
        .escape()
        .trim()
        .isLength({ min: 8, max: 256 }),
      body('password', 'Minimum once lower case symbol') // validation Password
        .trim()
        .isStrongPassword({ minLowercase: 1 }),
      body('password', 'Minimum once upper case symbol') // validation Password
        .isStrongPassword({ minUppercase: 1 }),
      body('password', 'Password must contain numbers. For example => !@#$%^&*_-=+') // validation Password
        .isStrongPassword({ minSymbols: 1 }),
      body('password', 'Password must contain numbers') // validation Password
        .isStrongPassword({ minNumbers: 1 }),
      body('name', 'Minimum name length 5 characters') // validation username
        .escape()
        .trim()
        .isLength({ min: 5, max: 256 })
    ];
  static validateLoginBody = [
      body('email', 'Minimum name length 5 characters')
        .escape()
        .trim()
        .isEmail(),
      body('password', 'Minimum password length 8 characters and maximum password length 256 characters')
        .escape()
        .trim()
        .isLength({ min: 8, max: 256 })
    ];

  static validateError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}


// return {
//   email: {
//     isEmail: {
//       errorMessage: 'Is not a valid email',
//       bail: true,
//     },
//   },
//   name: {
//     isLength: {
//       errorMessage: 'Is not a valid name',
//       options: { min: 5, max: 256 },
//     },
//   },
//   password: {
//     isLength: {
//       errorMessage: 'Invalid password',
//       options: { min: 8, max: 256 },
//     },
//     isStrongPassword: {
//       errorMessage: 'Invalid password',
//       options: [
//         { 
//         minLowercase: 1,
//         minUppercase: 1,
//         minSymbols: 1,
//         minNumbers: 1 
//       }
//       ],
//     },
// },
// },
