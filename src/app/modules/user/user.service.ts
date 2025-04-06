import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user-utils/generateStudentId';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { generateFacultyId } from './user-utils/generateFacultyId';
import { TAdmin } from '../admin/admin.interface';
import { generateAdmin } from './user-utils/generateAdminId';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculties/faculties.model';
import { TFaculty } from '../faculties/faculties.interface';
import { JwtPayload } from 'jsonwebtoken';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession(); // Start transaction
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    userData.email = payload.email;

    // Find the admission semester:
    const studentAdmissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );

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

const createFacultyIntoBD = async (password: string, payload: TFaculty) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'faculty';
    userData.email = payload.email;
    // create faculty id:
    userData.id = await generateFacultyId();

    //create newUser
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }
    // Assign user ID to faculty payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create Faculty
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create faculty');
    }

    // Commit transaction (finalize changes)
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createAdminIntoBD = async (password: string, payload: TAdmin) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = 'admin';
    userData.email = payload.email;
    userData.id = await generateAdmin();

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMeFromDB = async (user: JwtPayload) => {
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'user not found');
  }

  let result = null;
  if (user.role === 'admin') {
    result = await Admin.findOne({ id: user.userId }).populate('user');
  }
  if (user.role === 'faculty') {
    result = await Faculty.findOne({ id: user.userId }).populate('user');
  }
  if (user.role === 'student') {
    result = await Student.findOne({ id: user.userId }).populate('user');
  }

  return result;
};

const changeStatusIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id,{status:payload}, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoBD,
  createAdminIntoBD,
  getMeFromDB,
  changeStatusIntoDB,
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
