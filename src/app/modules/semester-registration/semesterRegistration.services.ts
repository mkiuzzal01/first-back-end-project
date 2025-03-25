import status from 'http-status';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import AppError from '../../errors/AppError';
import { registrationSemesterStatus } from './semesterRegistration.constant';
import { SemesterRegistration } from './semesterRegistration.model';
import mongoose from 'mongoose';
import { OfferCourse } from '../offer-course/offerCourse.model';

const createSemesterRegistrationIntoBD = async (
  payload: TSemesterRegistration,
) => {
  //check if have already registered with upcoming and ongoing:
  const academicSemester = payload?.academicSemester;
  const isSemesterUpcomingAndOngoing = await SemesterRegistration.findOne({
    $or: [
      { status: registrationSemesterStatus.UPCOMING },
      { status: registrationSemesterStatus.ONGOING },
    ],
  });

  if (isSemesterUpcomingAndOngoing) {
    throw new AppError(status.BAD_REQUEST, 'Cannot create semester');
  }

  //check the academic semester are available:
  if (payload.academicSemester) {
    const isAcademicSemesterExist =
      await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
      throw new AppError(status.NOT_FOUND, 'Academic semester not found');
    }
  }

  //check if have already registered:
  if (academicSemester) {
    const isSemesterRegistered = await SemesterRegistration.findOne({
      academicSemester,
    });
    if (isSemesterRegistered) {
      throw new AppError(status.BAD_REQUEST, 'Already registered');
    }
  }

  //create new semester registration:
  const result = await SemesterRegistration.create(payload);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check is semester if have in the database
  const isRequestedSemesterExists = await SemesterRegistration.findById(id);

  if (!isRequestedSemesterExists) {
    throw new AppError(status.NOT_FOUND, 'Requested semester not found');
  }

  // check if semester is ended before updating it
  if (isRequestedSemesterExists.status === registrationSemesterStatus.ENDED) {
    throw new AppError(status.BAD_REQUEST, 'Cannot update ended semester');
  }

  const requestedStatus = payload?.status;
  // verifyTheProcess:
  // UPCOMING =>  ONGOING => ENDED

  if (
    isRequestedSemesterExists.status === registrationSemesterStatus.UPCOMING &&
    requestedStatus === registrationSemesterStatus.ENDED
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      'Cannot update UPCOMING semester to ENDED status',
    );
  }

  if (
    isRequestedSemesterExists.status === registrationSemesterStatus.ONGOING &&
    requestedStatus === registrationSemesterStatus.UPCOMING
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      'Cannot update ONGOING semester to UPCOMING status',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find();
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Find the semester registration
    const semester = await SemesterRegistration.findById(id);
    if (!semester) {
      throw new AppError(status.NOT_FOUND, 'Semester registration not found');
    }

    if (semester.status !== 'UPCOMING') {
      throw new AppError(
        status.BAD_REQUEST,
        'Cannot delete a semester registration that is not UPCOMING',
      );
    }

    // Check if there are any offered courses linked to this semester
    const offeredCoursesExist = await OfferCourse.findOne(
      { semesterRegistration: id },
      null,
      { session }
    );

    if (offeredCoursesExist) {
      throw new AppError(
        status.BAD_REQUEST,
        'Cannot delete a semester registration with offered courses',
      );
    }

    // Delete the semester registration
    await SemesterRegistration.findByIdAndDelete(id, { session });

    // Commit transaction
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const semesterRegistrationService = {
  createSemesterRegistrationIntoBD,
  updateSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB,
};
