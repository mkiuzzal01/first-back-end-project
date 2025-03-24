import { Request, RequestHandler, Response } from 'express';
import { facultyService } from './faculties.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';

const updateFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const {faculty} = req.body;

    const result = await facultyService.updateFacultyIntoBD(id, faculty);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    });
  },
);

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await facultyService.getAllFacultyFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All faculties fetched successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await facultyService.getSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

export const facultyController = {
  updateFaculty,
  getAllFaculty,
  getSingleFaculty,
};
