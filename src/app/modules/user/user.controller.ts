import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a student successfully',
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty: FacultyData } = req.body;

  const result = await UserServices.createFacultyIntoBD(password, FacultyData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a faculty successfully',
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin: AdminData } = req.body;

  const result = await UserServices.createAdminIntoBD(password, AdminData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create an admin successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
