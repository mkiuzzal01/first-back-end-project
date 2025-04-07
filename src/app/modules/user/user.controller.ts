import { Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const file = req.file;
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      file,
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'create a student successfully',
      data: result,
    });
  },
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, faculty: FacultyData } = req.body;

    const result = await UserServices.createFacultyIntoBD(
      password,
      FacultyData,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'create a faculty successfully',
      data: result,
    });
  },
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, admin: AdminData } = req.body;

    const result = await UserServices.createAdminIntoBD(password, AdminData);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'create an admin successfully',
      data: result,
    });
  },
);

const getMe: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await UserServices.getMeFromDB(user);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  },
);

const changeStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status: newStatus } = req.body;
    const result = await UserServices.changeStatusIntoDB(id, newStatus);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User status changed successfully',
      data: result,
    });
  },
);


export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
