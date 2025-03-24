import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './faculties.constant';
import { TFaculty } from './faculties.interface';
import { Faculty } from './faculties.model';

const updateFacultyIntoBD = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remaining } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const findFaculty = Faculty.find()
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  const facultyQuery = new QueryBuilder(findFaculty, query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  console.log(id);
  const result = await Faculty.findById(id)
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteFacultyIntoDB = (id: string) => {
  // your logic to delete faculty goes here
};

export const facultyService = {
  updateFacultyIntoBD,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyIntoDB,
};
