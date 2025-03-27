import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Logged in successfully',
      data: result,
    });
  },
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userPass = req.body;
    const userData = req.user;

    const result = await AuthService.changePassword(userData,userPass);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Password update successfully',
      data: result,
    });
  },
);

export const AuthController = {
  loginUser,
  changePassword,
};
