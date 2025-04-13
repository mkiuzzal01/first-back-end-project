import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
} from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//all route
router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyControllers.getAllAcademicFaculties,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicFacultyControllers.deleteAcademicFaculty,
);

export const AcademicSemesterRouters = router;
