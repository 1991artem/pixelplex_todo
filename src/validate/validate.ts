import { check, ValidationChain } from 'express-validator';

export const validate_reg_body: ValidationChain[] = [
  check('email', 'Incorrect email')
    .escape()
    .isEmail(), // validation email
  check('password', 'Minimum password length 8 characters and maximum password length 256 characters') // validation Password
    .escape()
    .trim()
    .isLength({ min: 8, max: 256 }),
  check('password', 'Minimum once lower case symbol') // validation Password
    .trim()
    .isStrongPassword ({ minLowercase: 1 }),
  check('password', 'Minimum once upper case symbol') // validation Password
    .isStrongPassword ({ minUppercase: 1 }),
  check('password', 'Password must contain numbers. For example => !@#$%^&*_-=+') // validation Password
    .isStrongPassword ({ minSymbols: 1 }),
  check('password', 'Password must contain numbers') // validation Password
    .isStrongPassword ({ minNumbers: 1 }),
  check('name', 'Minimum name length 5 characters') // validation username
    .escape()
    .trim()
    .isLength({ min: 5, max: 256 })];

export const validate_login_body: ValidationChain[] = [
  check('email', 'Minimum name length 5 characters')
    .escape()
    .trim()
    .isEmail(),
  check('password', 'Minimum password length 8 characters and maximum password length 256 characters')
    .escape()
    .trim()
    .isLength({ min: 8, max: 256 }),
];
