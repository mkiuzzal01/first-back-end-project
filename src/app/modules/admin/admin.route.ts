import express from 'express';
import { AdminController } from './admin.controller';
import validationRequest from '../../middlewares/validRequest';
import { updateAdminValidation } from './admin.validation';

const router = express.Router();

// all routes
router.get('/', AdminController.getAllAdmin);
router.get('/:adminId', AdminController.getSingleAdmin);
router.patch(
  '/:adminId',
  validationRequest(updateAdminValidation),
  AdminController.updateAdmin,
);
router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoutes = router;
