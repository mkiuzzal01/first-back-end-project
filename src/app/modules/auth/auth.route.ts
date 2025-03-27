import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import {
  AuthValidation,
  changePasswordValidation,
  loginValidation,
} from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// all routes:
router.post(
  '/login', 
  validationRequest(loginValidation),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(changePasswordValidation),
  AuthController.changePassword,
);

export const AuthRoute = router;
