import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  courseFacultyValidation,
  createCourseValidation,
  updateCreateCourseValidation,
} from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

// all routes:
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.post(
  '/create-course',
  validationRequest(createCourseValidation),
  CourseController.createCourse,
);

router.patch(
  '/:id',
  validationRequest(updateCreateCourseValidation),
  CourseController.updateCourse,
);

router.delete('/:id', CourseController.deleteCourse);
router.put(
  '/:courseId/assign-faculty',
  validationRequest(courseFacultyValidation),
  CourseController.assignCourseFaculty,
);
router.delete(
  '/:courseId/remove-faculty',
  validationRequest(courseFacultyValidation),
  CourseController.removeCourseFaculty,
);

export const CourseRoutes = router;
