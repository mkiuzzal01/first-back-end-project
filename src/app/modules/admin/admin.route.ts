import express from 'express';
import { AdminController } from './admin.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateAdminValidation } from './admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// all routes
router.get('/', auth(USER_ROLE.superAdmin), AdminController.getAllAdmin);
router.get('/:adminId', AdminController.getSingleAdmin);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validationRequest(updateAdminValidation),
  AdminController.updateAdmin,
);
router.delete('/:id', auth(USER_ROLE.superAdmin), AdminController.deleteAdmin);

export const AdminRoutes = router;
