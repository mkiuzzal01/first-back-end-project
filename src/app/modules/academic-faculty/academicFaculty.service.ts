import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
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

const createAcademicFacultyIntoDB = async (payload:TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const AcademicFacultyServices = {
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  createAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
