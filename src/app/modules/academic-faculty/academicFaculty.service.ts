import mongoose from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ id });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { id },
    { $set: payload },
    { new: true, runValidators: true },
  );

  // console.log(result);
  return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deleteFaculty = await AcademicFaculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(
        status.BAD_REQUEST,
        'Failed to delete academic faculty',
      );
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AcademicFacultyServices = {
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
