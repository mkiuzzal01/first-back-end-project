import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validationRequest from '../../middlewares/validRequest';
import { createStudentValidationSchema } from '../student/student.validation.zod';
import { createAdminValidation } from '../admin/admin.validation';
import { createFacultiesValidation } from '../faculties/faculties.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { changeStatusValidationSchema } from './user.validation';
import { upload } from '../../../utils/sendImageToCloudiary';

const router = express.Router();

// all routes
router.post(
  '/create-student',
  auth(USER_ROLE?.admin),
  upload.single('file'),
  (req:Request,res:Response, next:NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    next()
  },
  // validationRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE?.admin),
  validationRequest(createFacultiesValidation),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE?.admin),
  validationRequest(createAdminValidation),
  UserControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validationRequest(changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get(
  '/me',
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  UserControllers.getMe,
);

export const UserRoutes = router;
