import express from 'express';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validRequest';
import { createStudentValidationSchema } from '../student/student.validation.zod';
import { createAdminValidation } from '../admin/admin.validation';
import { createFacultiesValidation } from '../faculties/faculties.validation';

const router = express.Router();

// all routes
router.post(
  '/create-student',
  validationRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validationRequest(createFacultiesValidation),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validationRequest(createAdminValidation),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
