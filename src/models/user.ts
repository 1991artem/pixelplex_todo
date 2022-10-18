import { Schema, model, Types } from 'mongoose';
import { IUser } from '../helps/interfaces';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
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
