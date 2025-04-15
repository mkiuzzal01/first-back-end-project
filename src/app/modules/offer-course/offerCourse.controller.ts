import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { offerCoursesService } from './offerCourse.service';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';

const getAllOfferCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { query } = req;
    const result = await offerCoursesService.getAllOfferCoursesFromDB(query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All Offer Courses fetched successfully',
      data: result,
    });
  },
);

const getSingleOfferCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await offerCoursesService.getSingleOfferCourseFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Offer Course fetched successfully',
      data: result,
    });
  },
);

const getMyOfferCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const {userId} = req.user;
    const query = req.query;
    const result = await offerCoursesService.getMyOfferCoursesFromDB(userId,query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'My Offer Courses fetched successfully',
      data: result,
    })
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
    const { id } = req.params;
    const courseInfo = req.body;

    const result = await offerCoursesService.updateOfferCourseIntoDB(
      id,
      courseInfo,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Offer Course updated successfully',
      data: result,
    });
  },
);

const deleteOfferCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await offerCoursesService.deleteOfferCourseFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Offer Course deleted successfully',
    });
  },
);

export const offerCourseController = {
  getAllOfferCourses,
  getSingleOfferCourses,
  getMyOfferCourses,
  createOfferCourse,
  updateOfferCourse,
  deleteOfferCourse,
};
