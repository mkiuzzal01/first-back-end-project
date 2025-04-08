import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { EnrolledCourseController } from './enrolledCourse.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { createEnrolledCourseValidation } from './enrolledCourse.validation';

const router = express.Router();

// all routes:
router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validationRequest(createEnrolledCourseValidation),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
