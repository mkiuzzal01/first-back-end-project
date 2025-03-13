import { TAcademicSemester } from '../academic-semester/academicSemester.interface';
import { User } from './user.model';

// Find the last student
const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? Number(lastStudent.id) : 0;
};

// Generate Student ID
export const generateStudentId = async (payload: TAcademicSemester) => {
  const year = new Date(payload.year).getFullYear().toString();

  const lastId = await findLastStudent();

  const lastStudentSemesterCode = lastId.toString().substring(4, 6);
  const lastStudentSemesterYear = lastId.toString().substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = new Date(payload.year).getFullYear().toString();

  // console.log(currentSemesterCode, currentSemesterYear);
  

  let incrementId = 1;
  if (
    lastId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    incrementId = Number(lastId.toString().substring(6)) + 1;
  }

  const formattedIncrementId = incrementId.toString().padStart(4, '0');
  const studentId = `${year}${payload.code}${formattedIncrementId}`;

  return studentId;
};
