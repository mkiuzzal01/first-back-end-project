import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'super-admin'|'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface userModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJwtIssuedBeforePasswordChange(
    passwordChangeTime: Date,
    tokenIssuedTime: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
