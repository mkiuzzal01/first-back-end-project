import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
} from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

//all route
router.post(
  '/create-academic-faculty',
  validationRequest(createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.patch(
  '/:id',
  validationRequest(updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);
router.delete('/:id', AcademicFacultyControllers.deleteAcademicFaculty);

export const AcademicSemesterRouters = router;
