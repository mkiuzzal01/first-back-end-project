import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';
import { enrolledCourseService } from './enrolledCourse.services';

const createEnrolledCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const {userId} = req.user;
    const {offeredCourse} = req.body;
    const result = await enrolledCourseService.createEnrolledCourseIntoDB(userId,offeredCourse);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Enrolled course created successfully',
      data: result,
    });
  },
);

export const EnrolledCourseController = {
  createEnrolledCourse,
};
