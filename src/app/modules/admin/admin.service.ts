import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { adminSearchableField } from './admin.constant';

const getAllAdminFromBD = async (query: Record<string, unknown>) => {
  const adminFind = Admin.find().populate('user');

  const adminQuery = new QueryBuilder(adminFind, query)
    .search(adminSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const results = adminQuery.modelQuery;
  return results;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: TAdmin) => {
  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(status.BAD_REQUEST, 'admin delete failed');
    }

    const deleteUser = await User.findByIdAndUpdate(
      deleteAdmin.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(status.BAD_REQUEST, 'user delete failed');
    }

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminServices = {
  getAllAdminFromBD,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminIntoDB,
};
