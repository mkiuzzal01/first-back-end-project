import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    departmentId,
    payload,
    { new: true },
  );
  return result;
};

const getSingleAcademicFromDB = async (departmentId: string) => {
  const result = await AcademicDepartment.findById(departmentId);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  updateSingleAcademicDepartmentIntoDB,
  getSingleAcademicFromDB,
  getAllAcademicDepartmentsFromDB,
};
