import express from 'express';
import { facultyController } from './faculties.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateFacultiesValidation } from './faculties.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// all routes
router.get('/', auth(USER_ROLE?.admin, USER_ROLE?.admin), facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  validationRequest(updateFacultiesValidation),
  facultyController.updateFaculty,
);

export const FacultyRoutes = router;
