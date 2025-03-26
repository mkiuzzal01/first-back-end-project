import express from 'express';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validRequest';
import { createStudentValidationSchema } from '../student/student.validation.zod';
import { createAdminValidation } from '../admin/admin.validation';
import { createFacultiesValidation } from '../faculties/faculties.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// all routes
router.post(
  '/create-student',
  auth(USER_ROLE?.admin),
  validationRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE?.admin),
  validationRequest(createFacultiesValidation),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE?.admin),
  validationRequest(createAdminValidation),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
