import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { RequestHandler } from 'express';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const department = req.body;
  const result =
    await AcademicDepartmentService.createAcademicDepartmentIntoDB(department);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const department = req.body;

  const result =
    await AcademicDepartmentService.updateSingleAcademicDepartmentIntoDB(
      departmentId,
      department,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

const getSingleDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicFromDB(departmentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department fetched successfully',
    data: result,
  });
});

const getAllDepartments: RequestHandler = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All academic departments fetched successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  updateDepartment,
  getSingleDepartment,
  getAllDepartments,
};
