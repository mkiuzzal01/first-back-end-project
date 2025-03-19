import { RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { AdminServices } from './admin.service';
import sendResponse from '../../../utils/sendResponse';
import status from 'http-status';

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await AdminServices.getAllAdminFromBD(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All admins retrieve successfully',
    data: result,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { adminId } = req.params;

  const result = await AdminServices.getSingleAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin retrieve successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedAdmin = req.body.admin;

  const result = await AdminServices.updateAdminIntoDB(id, updatedAdmin);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminIntoDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
