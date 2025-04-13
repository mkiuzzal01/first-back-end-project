import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CourseService } from './course.services';
import { Request, RequestHandler, Response } from 'express';
import { Course } from './course.model';

const createCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const course = req.body;
    const result = await CourseService.createCourseIntoDB(course);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  },
);

const updateCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = req.body;
    const result = await CourseService.updateCourseIntoDB(id, course);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  },
);

const deleteCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.deleteCourseFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course deleted successfully',
    });
  },
);

const getAllCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { query } = req;
    const result = await CourseService.getAllCoursesFromDB(query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All courses fetched successfully',
      data: result,
    });
  },
);

const getSingleCourse: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.getSingleCourseFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single course fetched successfully',
      data: result,
    });
  },
);

const assignCourseFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseService.assignCourseFacultyIntoDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'faculty assigned is successfully',
      data: result,
    });
  },
);

const removeCourseFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseService.removeCourseFacultyIntoDB(
      courseId,
      faculties,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'remove faculty is successfully',
      data: result,
    });
  },
);

const getIncludedFacultiesWithCourses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await CourseService.getIncludedFacultiesWithCoursesFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculties retrieved successfully',
      data: result,
    });
  },
);

export const CourseController = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
  assignCourseFaculty,
  removeCourseFaculty,
  getIncludedFacultiesWithCourses,
};
