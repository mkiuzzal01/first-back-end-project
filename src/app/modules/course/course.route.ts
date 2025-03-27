import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  courseFacultyValidation,
  createCourseValidation,
  updateCreateCourseValidation,
} from './course.validation';
import { CourseController } from './course.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// all routes:
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getAllCourses,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getSingleCourse,
);
router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validationRequest(createCourseValidation),
  CourseController.createCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validationRequest(updateCreateCourseValidation),
  CourseController.updateCourse,
);

router.delete('/:id', auth(USER_ROLE.admin), CourseController.deleteCourse);
router.put(
  '/:courseId/assign-faculty',
  auth(USER_ROLE.admin),
  validationRequest(courseFacultyValidation),
  CourseController.assignCourseFaculty,
);
router.delete(
  '/:courseId/remove-faculty',
  auth(USER_ROLE.admin),
  validationRequest(courseFacultyValidation),
  CourseController.removeCourseFaculty,
);

export const CourseRoutes = router;
