import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateStudentValidationSchema } from './student.validation.zod';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validationRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
