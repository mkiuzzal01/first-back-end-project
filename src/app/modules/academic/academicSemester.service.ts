import { academicSemesterMapper } from './academicSemester.constance';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Academic Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getSingleAcademicFromDB = async (year: string) => {
  const result = await AcademicSemester.find({ year });
  return result;
};

const updateSingleAcademicDocumentIntoDB = async (
  year: string,
  doc: TAcademicSemester,
) => {
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
