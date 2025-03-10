import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import academicValidationSchema from './academicSemester.validation';

const router = express.Router();

// all routes
router.post(
  '/create-academic-semester',
  validationRequest(academicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
