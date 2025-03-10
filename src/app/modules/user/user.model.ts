import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

// middleware:
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
