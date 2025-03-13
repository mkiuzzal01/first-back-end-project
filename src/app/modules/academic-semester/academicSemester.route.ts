import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { academicValidation } from './academicSemester.validation';

const router = express.Router();

// all routes
router.get('/', AcademicSemesterControllers.findAllAcademicSemester);
router.get('/:year', AcademicSemesterControllers.findSingleAcademicSemester);
router.post(
  '/  ',
  validationRequest(academicValidation.academicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
router.patch(
  '/:year',
  validationRequest(academicValidation.updateAcademicSemesterSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
