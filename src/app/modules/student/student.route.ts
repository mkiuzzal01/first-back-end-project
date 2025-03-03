import { StudentController } from './student.controller';
import express from 'express';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);

export const StudentRoutes = router;
