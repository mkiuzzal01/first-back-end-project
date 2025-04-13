import express from 'express';
import { offerCourseController } from './offerCourse.controller';
import validationRequest from '../../middlewares/validRequest';
import {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
} from './offerCourse.validation';
import { USER_ROLE } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

// all routes:
router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(createOfferedCourseValidation),
  offerCourseController.createOfferCourse,
);
router.patch(
  '/update-offered-course/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateOfferedCourseValidation),
  offerCourseController.updateOfferCourse,
);
router.get(
  '/get-single-offered-course/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  offerCourseController.getSingleOfferCourses,
);
router.get(
  '/get-all-offered-courses',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty),
  offerCourseController.getAllOfferCourses,
);

export const OfferCourseRouter = router;
