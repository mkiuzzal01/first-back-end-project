import mongoose from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { academicFacultySearchableField } from './academicFaculty.constant';

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyFind = AcademicFaculty.find().populate('user');

  const academicFacultyQuery = new QueryBuilder(academicFacultyFind, query)
    .search(academicFacultySearchableField)
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {

  const result = await AcademicFaculty.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deleteFaculty = await AcademicFaculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(
        status.BAD_REQUEST,
        'Failed to delete academic faculty',
      );
    }

    const deleteUser = await User.findByIdAndUpdate(
      deleteFaculty.user,
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
