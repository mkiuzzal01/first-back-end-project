import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { enrolledCourseService } from './enrolledCourse.services';

const getAllEnrolledCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await enrolledCourseService.getAllEnrolledCourseFromDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All enrolled course fetched successfully',
      data: result,
    });
  },
);

const getSingleEnrolledCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await enrolledCourseService.getSingleEnrolledCourseFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Enrolled course fetched successfully',
      data: result,
    });
  },
);

const createEnrolledCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const { offeredCourse } = req.body;
    const result = await enrolledCourseService.createEnrolledCourseIntoDB(
      userId,
      offeredCourse,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Enrolled course created successfully',
      data: result,
    });
  },
);

const updateEnrolledCourseMarks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const info = req.body;
    const result = await enrolledCourseService.updateEnrolledCourseMarksIntoDB(
      userId,
      info,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Enrolled course marks updated successfully',
      data: result,
    });
  },
);

export const EnrolledCourseController = {
  getAllEnrolledCourse,
  getSingleEnrolledCourse,
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
