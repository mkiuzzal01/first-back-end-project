import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  FacultyValidation,
  updateAcademicFacultyValidation,
} from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

//all route
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validationRequest(updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.delete('/:facultyId', AcademicFacultyControllers.deleteAcademicFaculty);

export const AcademicSemesterRouters = router;
