import status from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterMapper } from './academicSemester.constance';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicFromDB = async (year: string) => {
  const result = await AcademicSemester.find({ year });
  return result;
};

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new AppError(status.NOT_FOUND, 'Invalid Academic Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const updateSingleAcademicDocumentIntoDB = async (
  year: string,
  doc: TAcademicSemester,
) => {
  if (academicSemesterMapper[doc.name] !== doc.code) {
    throw new AppError(status.NOT_FOUND, 'Invalid Academic Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { year },
    { $set: doc },
    { new: true, runValidators: true },
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getSingleAcademicFromDB,
  getAllAcademicSemestersFromDB,
  updateSingleAcademicDocumentIntoDB,
};
