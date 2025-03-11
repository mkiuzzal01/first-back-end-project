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

const findSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { year } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicFromDB(year);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic semester fetched successfully',
      data: result,
    });
  },
);

const findAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All academic semesters fetched successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  findSingleAcademicSemester,
  findAllAcademicSemester
};
