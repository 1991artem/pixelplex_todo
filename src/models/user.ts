import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true},
  password: {
    type: String, 
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  task: [
    {
      type: Types.ObjectId,
      ref: 'Task' 
    }
  ],
  groups: [
    {
      type: Types.ObjectId,
      ref: 'Group' 
    }
  ]
});

export const User = model('User', userSchema);