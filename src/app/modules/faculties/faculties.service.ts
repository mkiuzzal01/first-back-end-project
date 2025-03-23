import { TFaculty } from './faculties.interface';

const updateFacultyIntoBD = (id: string, payload: Partial<TFaculty>) => {
  // your logic to update faculty goes here
};

const getAllFacultyFromDB = () => {
  // your logic to get all faculty goes here
};

const getSingleFacultyFromDB = (id: string) => {
  // your logic to get single faculty goes here
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
