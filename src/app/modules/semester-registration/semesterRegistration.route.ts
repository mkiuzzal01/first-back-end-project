import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validationRequest from '../../middlewares/validRequest';
import { createSemesterRegistrationValidation, updateSemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

// all routes:
router.post(
  '/create-semester-registration',
  validationRequest(createSemesterRegistrationValidation),
  semesterRegistrationController.createSemesterRegistration,
);
router.patch(
  '/:id',
  validationRequest(updateSemesterRegistrationValidation),
  semesterRegistrationController.updateSemesterRegistration,
);
router.get('/', semesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
