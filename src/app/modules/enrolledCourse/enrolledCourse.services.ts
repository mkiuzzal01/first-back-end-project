import status from 'http-status';
import AppError from '../../errors/AppError';
import { OfferCourse } from '../offer-course/offerCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../student/student.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  
  const isExistCourse = await OfferCourse.findById(payload);

  if (!isExistCourse) {
    throw new AppError(status.BAD_REQUEST, 'offered course not found');
  }

  const student = await Student.findOne({ id: userId });
  if (!student) {
    throw new AppError(status.BAD_REQUEST, 'student  not found');
  }

  const isAlreadyCourseEnrolled = await EnrolledCourse.findOne({
    student: student.id,
    semesterRegistration: isExistCourse.semesterRegistration,
    offeredCourse: payload.offeredCourse,
  });

  if (isAlreadyCourseEnrolled) {
    throw new AppError(
      status.BAD_REQUEST,
      'you are already enrolled the course',
    );
  }

  //create  new  enrolled course:

  
};

export const enrolledCourseService = {
  createEnrolledCourseIntoDB,
};
