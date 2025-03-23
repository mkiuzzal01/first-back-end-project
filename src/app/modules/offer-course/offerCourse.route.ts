import express from 'express';
import { offerCourseController } from './offerCourse.controller';
import validationRequest from '../../middlewares/validRequest';
import {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
} from './offerCourse.validation';

const router = express.Router();

// all routes:
router.post(
  '/create-offered-course',
  validationRequest(createOfferedCourseValidation),
  offerCourseController.createOfferCourse,
);
router.patch(
  '/:id',
  validationRequest(updateOfferedCourseValidation),
  offerCourseController.updateOfferCourse,
);
router.get('/:id', offerCourseController.updateOfferCourse);
router.get('/', offerCourseController.getAllOfferCourses);

export const offerCourseRouter = router;
