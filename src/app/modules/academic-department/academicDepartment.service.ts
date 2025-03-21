import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  console.log(result);

  return result;
};

const getSingleAcademicFromDB = async (departmentId: string) => {
  try {
    const result =
      await AcademicDepartment.findById(departmentId).populate(
        'academicFaculty',
      );
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  updateSingleAcademicDepartmentIntoDB,
  getSingleAcademicFromDB,
  getAllAcademicDepartmentsFromDB,
};

//populate for finding reference data:
