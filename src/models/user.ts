import { Schema, model, Types } from 'mongoose';
import { IUser } from '../helps/interfaces';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    isLength: {
      errorMessage: 'Minimum name length 5 characters',
      options: { min: 5, max: 256 },
    },
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    trim: true,
    isEmail: {
      bail: true,
      errorMessage: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    isLength: {
      errorMessage: 'Minimum password length 8 characters and maximum password length 256 characters',
      options: { min: 8, max: 256 },
    },
    isStrongPassword: [
      {
        errorMessage: 'Minimum once lower case symbol',
        options: { minLowercase: 1 },
      },
      {
        errorMessage: 'Minimum once upper case symbol',
        options: { minUppercase: 1 },
      },
      {
        errorMessage: 'Password must contain numbers. For example => !@#$%^&*_-=+',
        options: { minSymbols: 1 },
      },
      {
        errorMessage: 'Password must contain numbers',
        options: { minNumbers: 1 },
      },
    ],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  groups: [
    {
      type: Types.ObjectId,
      ref: 'Group',
    },
  ],
});

export const User = model('User', userSchema, 'users');
