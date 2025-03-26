import { model, Schema } from 'mongoose';
import { TUser, userModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, userModel>(
  {
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Hide password after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//check user is exist:
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

//check password is match:
userSchema.statics.isPasswordMatch = async function (
  plaintextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};

export const User = model<TUser, userModel>('User', userSchema);
