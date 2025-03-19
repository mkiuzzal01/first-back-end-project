import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const route = express.Router();

// all routes
route.get('/', AcademicDepartmentController.getAllDepartments);

route.get('/:id', AcademicDepartmentController.getSingleDepartment);

route.post(
  '/create-department',
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.createDepartment,
);

route.patch(
  '/:id',
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.updateDepartment,
);

export const AcademicDepartmentRoutes = route;
