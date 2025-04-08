import status from 'http-status';
import AppError from '../../errors/AppError';
import { OfferCourse } from '../offer-course/offerCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';

const createEnrolledCourseIntoDB = async (
  userId: string,
  offeredCourse: Partial<TEnrolledCourse>,
) => {
  const session = await mongoose.startSession();

  const isExistCourse = await OfferCourse.findById(offeredCourse);

  if (!isExistCourse) {
    throw new AppError(status.BAD_REQUEST, 'offered course not found');
  }

  if (isExistCourse.maxCapacity <= 0) {
    throw new AppError(status.BAD_REQUEST, 'the room is full');
  }

  const student = await Student.findOne({ id: userId });

  if (!student) {
    throw new AppError(status.BAD_REQUEST, 'student not found');
  }

  const isAlreadyCourseEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isExistCourse?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isAlreadyCourseEnrolled) {
    throw new AppError(
      status.BAD_REQUEST,
      'you are already enrolled the course',
    );
  }

  //create  new  enrolled course:
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isExistCourse.semesterRegistration,
          academicSemester: isExistCourse.academicSemester,
          academicFaculty: isExistCourse.academicFaculty,
          academicDepartment: isExistCourse.academicDepartment,
          offeredCourse: offeredCourse,
          course: isExistCourse.course,
          student: student._id,
          faculty: isExistCourse.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(status.BAD_REQUEST, 'failed to enroll in this course');
    }

    const maxCapacity = isExistCourse.maxCapacity;

    await OfferCourse.findByIdAndUpdate(
      offeredCourse,

      {
        maxCapacity: maxCapacity - 1,
      },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const enrolledCourseService = {
  createEnrolledCourseIntoDB,
};
