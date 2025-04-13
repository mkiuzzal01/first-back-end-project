import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

// all routes
route.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.student),
  AcademicDepartmentController.getAllDepartments,
);

route.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicDepartmentController.getSingleDepartment,
);

route.post(
  '/create-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.createDepartment,
);

route.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.updateDepartment,
);

export const AcademicDepartmentRoutes = route;
