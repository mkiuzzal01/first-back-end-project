import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { offerCoursesService } from './offerCourse.service';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';

const getAllOfferCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Implement your logic here
  },
);
const getSingleOfferCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Implement your logic here
  },
);

const createOfferCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const course = req.body;
    const result = await offerCoursesService.createOfferCourseIntoDB(course);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Offer Course created successfully',
      data: result,
    });
  },
);

const updateOfferCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Implement your logic here
  },
);

const deleteOfferCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Implement your logic here
  },
);

export const offerCourseController = {
  getAllOfferCourses,
  getSingleOfferCourses,
  createOfferCourse,
  updateOfferCourse,
  deleteOfferCourse,
};
