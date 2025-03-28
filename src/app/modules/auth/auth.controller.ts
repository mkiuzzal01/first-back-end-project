import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';
import status from 'http-status';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { accessToken, refreshToken, needsPasswordChange } =
      await AuthService.loginUser(req.body);

    //set the refresh token in cookies:
    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
    });
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Logged in successfully',
      data: {
        accessToken,
        needsPasswordChange,
      },
    });
  },
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userPass = req.body;
    const userData = req.user;

    const result = await AuthService.changePassword(userData, userPass);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Password update successfully',
      data: result,
    });
  },
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Access token is retrieved successfully',
      data: {
        result,
      },
    });
  },
);

const forgetPassword:RequestHandler = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.body;
    const result = await AuthService.forgetPassword(id);
    sendResponse(res,{
      statusCode: status.OK,
      success: true,
      message: 'Forget Password Link has been sent to your email',
      data: result,
    })
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
