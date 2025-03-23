import express from 'express';
import { facultyController } from './faculties.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateFacultiesValidation } from './faculties.validation';

const router = express.Router();

// all routes
router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  validationRequest(updateFacultiesValidation),
  facultyController.updateFaculty,
);

export const FacultyRoutes = router;
