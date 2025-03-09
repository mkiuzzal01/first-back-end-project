import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: { type: 'string', unique: true, required: true },
    password: { type: 'string', required: true },
    needsPasswordChange: { type: 'boolean', default: true },
    role: {
      type: 'string',
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: 'string',
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
