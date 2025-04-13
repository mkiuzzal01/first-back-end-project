import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { academicValidation } from './academicSemester.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// all routes
router.get(
  '/all-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student),
  AcademicSemesterControllers.findAllAcademicSemester,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicSemesterControllers.findSingleAcademicSemester,
);
router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(academicValidation.academicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(academicValidation.updateAcademicSemesterSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
