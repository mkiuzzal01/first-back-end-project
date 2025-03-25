import express from 'express';
import validationRequest from '../../middlewares/validRequest';
import { loginValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

// all routes:
router.post(
  '/login',
  validationRequest(loginValidation),
  AuthController.loginUser,
);

export const AuthRoute = router;
