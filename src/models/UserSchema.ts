import { Schema, model, Types } from 'mongoose';
import { IUser } from '../helps/interfaces';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 255,
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
