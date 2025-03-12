import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user_utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession(); // Start transaction
  session.startTransaction();
  try {
    const userData: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: 'student',
    };

    // Find the admission semester:
    const studentAdmissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    ).session(session);
    if (!studentAdmissionSemester) {
      throw new Error('Admission semester not found');
    }

    // Generate Student ID
    userData.id = await generateStudentId(studentAdmissionSemester);

    // Create User
    const newUser = await User.create([userData], { session });

    if (!newUser || newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    // Assign user ID to student payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create Student
    const newStudent = await Student.create([payload], { session });

    if (!newStudent || newStudent.length === 0) {
      throw new Error('Failed to create student');
    }

    // Commit transaction (finalize changes)
    await session.commitTransaction();
    session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction(); // Rollback transaction on failure
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
