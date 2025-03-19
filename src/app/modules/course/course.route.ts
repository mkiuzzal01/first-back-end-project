import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  createCourseValidation,
  updateCreateCourseValidation,
} from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

// all routes

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.patch(
  '/:id',
  validationRequest(updateCreateCourseValidation),
  CourseController.updateCourse,
);
router.post(
  '/:id',
  validationRequest(createCourseValidation),
  CourseController.createCourse,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
