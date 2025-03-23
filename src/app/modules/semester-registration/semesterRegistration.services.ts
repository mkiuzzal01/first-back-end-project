import status from 'http-status';
import { AcademicSemester } from '../academic-semester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import AppError from '../../errors/AppError';
import { semesterRegistration } from './semesterRegistration.model';
import { registrationSemesterStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoBD = async (
  payload: TSemesterRegistration,
) => {
  //check if have already registered with upcoming and ongoing:
  const academicSemester = payload?.academicSemester;
  const isSemesterUpcomingAndOngoing = await semesterRegistration.findOne({
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
    const isSemesterRegistered = await semesterRegistration.findOne({
      academicSemester,
    });
    if (isSemesterRegistered) {
      throw new AppError(status.BAD_REQUEST, 'Already registered');
    }
  }

  //create new semester registration:
  const result = await semesterRegistration.create(payload);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check is semester if have in the database
  const isRequestedSemesterExists = await semesterRegistration.findById(id);

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

  const result = await semesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllSemesterRegistrationFromDB = async () => {
  const result = await semesterRegistration.find();
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await semesterRegistration.findById(id);
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoBD,
  updateSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
};
