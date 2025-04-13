import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validationRequest from '../../middlewares/validRequest';
import {
  createSemesterRegistrationValidation,
  updateSemesterRegistrationValidation,
} from './semesterRegistration.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// all routes:
router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(createSemesterRegistrationValidation),
  semesterRegistrationController.createSemesterRegistration,
);
router.patch(
  '/update-semester-registration/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validationRequest(updateSemesterRegistrationValidation),
  semesterRegistrationController.updateSemesterRegistration,
);
router.get(
  '/all-registered-semester',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);
router.get(
  '/single-registered-semester/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.delete(
  '/delete-registered-semester/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  semesterRegistrationController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
