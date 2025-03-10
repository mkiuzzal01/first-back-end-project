import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidationSchema } from '../student/student.validation.zod';
import validationRequest from '../../middlewares/validRequest';

const router = express.Router();
// Middleware for handling request body parsing and sanitization:

// all routes
router.post(
  '/create-student',
  validationRequest(studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
