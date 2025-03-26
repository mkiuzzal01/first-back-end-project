import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TUser) => {
  const isUserExist = await User.isUserExistByCustomId(payload?.id);

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted === true) {
    throw new AppError(status.FORBIDDEN, 'User is deleted');
  }
  const userStatus = isUserExist?.status;

  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'User is blocked');
  }

  //check the provided password is exist:
  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    isUserExist?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  //generate access token:
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.token_secret as string, {
    expiresIn: '10d',
  });

  //then finally login  user:
  return {
    accessToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
