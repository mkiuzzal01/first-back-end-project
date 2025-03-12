import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { FacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

//all route
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.post(
  '/create-academic-faculty',
  validationRequest(FacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validationRequest(FacultyValidation.updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicSemesterRouters = router;
