import { RequestHandler } from 'express';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
