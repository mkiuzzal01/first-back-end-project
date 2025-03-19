import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';

const getAllAdminFromBD = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne();
  return result;
};

const updateAdminIntoDB = async (id: string, payload: TAdmin) => {
  console.log(payload);

  const result = await Admin.findOneAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deleteAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(status.BAD_REQUEST, 'admin delete failed');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
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
