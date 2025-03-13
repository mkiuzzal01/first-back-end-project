import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateStudentValidationSchema } from './student.validation.zod';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch(
  '/:studentId',
  validationRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
