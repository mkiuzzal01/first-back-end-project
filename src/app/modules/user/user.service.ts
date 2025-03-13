import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user_utils';
import AppError from '../../errors/AppError';
import status from 'http-status';

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
      throw new AppError(status.NOT_FOUND, 'Admission semester not found');
    }

    // Generate Student ID
    userData.id = await generateStudentId(studentAdmissionSemester);

    // Create User
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    // Assign user ID to student payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create Student
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create student');
    }

    // Commit transaction (finalize changes)
    await session.commitTransaction();
    session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};


//how to create transaction:

// step_1:
// create transaction

// step_2
// start transaction

// step-3
// commit transaction
// then end transaction

// step_4:
// if  error so abort transaction for rollback
// the endSession of the transaction
