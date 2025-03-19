import status from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { CourseService } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const { course } = req.body;
  const result = await CourseService.createCourseIntoDB(course);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = req.body;
  const result = await CourseService.updateCourseIntoDB(id, course);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course deleted successfully',
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All courses fetched successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single course fetched successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
};
