import express from 'express';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validRequest';
import { createStudentValidationSchema } from '../student/student.validation.zod';

const router = express.Router();

// all routes
router.post(
  '/create-student',
  // validationRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
