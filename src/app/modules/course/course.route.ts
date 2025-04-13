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
  '/all-courses',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getAllCourses,
);
router.get(
  '/get-single-course/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getSingleCourse,
);

router.get(
  '/include-faculties/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getIncludedFacultiesWithCourses,
);

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(createCourseValidation),
  CourseController.createCourse,
);

router.patch(
  '/update-course/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateCreateCourseValidation),
  CourseController.updateCourse,
);

router.delete(
  '/delete-course/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseController.deleteCourse,
);
router.put(
  '/assign-faculty/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(courseFacultyValidation),
  CourseController.assignCourseFaculty,
);
router.delete(
  '/remove-faculty/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(courseFacultyValidation),
  CourseController.removeCourseFaculty,
);

export const CourseRoutes = router;
