import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import academicValidationSchema from './academicSemester.validation';

const router = express.Router();

// all routes
router.get('/', AcademicSemesterControllers.findAllAcademicSemester);

router.get('/:year', AcademicSemesterControllers.findSingleAcademicSemester);

router.post(
  '/create-academic-semester',
  validationRequest(academicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
