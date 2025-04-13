import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { academicFacultySearchableField } from './academicFaculty.constant';
import AppError from '../../errors/AppError';
import status from 'http-status';

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyFind = AcademicFaculty.find();
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
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'Academic Faculty not found');
  }
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

  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'Academic Faculty not found');
  }
  return result;
};

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'Academic Faculty not found');
  }
  return result;
};

export const AcademicFacultyServices = {
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  createAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
