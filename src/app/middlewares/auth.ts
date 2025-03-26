import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

export const auth = (...requiredRole:TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'you are not authorized');
    }

    //verified token with decode:
    jwt.verify(token, config.token_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(status.UNAUTHORIZED, 'invalid token');
      }

      //verification of role :
      const role = (decoded as JwtPayload)?.role;
      if (requiredRole && !requiredRole.includes(role)) {
        throw new AppError(status.UNAUTHORIZED, 'invalid role');
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};
