import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { loginValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// all routes:
router.post(
  '/login',
  auth(USER_ROLE.admin),
  validationRequest(loginValidation),
  AuthController.loginUser,
);

export const AuthRoute = router;
