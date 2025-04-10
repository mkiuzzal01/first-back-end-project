import status from 'http-status';
import AppError from '../../errors/AppError';
import { OfferCourse } from '../offer-course/offerCourse.model';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semester-registration/semesterRegistration.model';
import { Course } from '../course/course.model';
import {
  TEnrolledCourse,
  TEnrolledCourseMarks,
} from './enrolledCourse.interface';
import { Faculty } from '../faculties/faculties.model';
import { calculateGradeAndPoint } from './enrolledCourse.utils';

const getAllEnrolledCourseFromDB = async () => {
  const result = await EnrolledCourse.find();
  return result;
};

const getSingleEnrolledCourseFromDB = async (id: string) => {
  const result = await EnrolledCourse.findById(id);
  return result;
};
const createEnrolledCourseIntoDB = async (
  userId: string,
  offeredCourseId: string,
): Promise<void> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // 1. Validate offered course
    const offeredCourse =
      await OfferCourse.findById(offeredCourseId).session(session);

    if (!offeredCourse) {
      throw new AppError(status.BAD_REQUEST, 'Offered course not found');
    }

    if (offeredCourse.maxCapacity <= 0) {
      throw new AppError(status.BAD_REQUEST, 'The room is full');
    }

    const course = await Course.findById(offeredCourse.course).session(session);

    // 2. Validate student
    const student = await Student.findOne({ id: userId }, { _id: 1 }).session(
      session,
    );
    if (!student?._id) {
      throw new AppError(status.BAD_REQUEST, 'Student not found');
    }

    // 3. Check if already enrolled
    const isAlreadyEnrolled = await EnrolledCourse.findOne({
      semesterRegistration: offeredCourse.semesterRegistration,
      offeredCourse: offeredCourse._id,
      student: student._id,
    }).session(session);

    if (isAlreadyEnrolled) {
      throw new AppError(
        status.BAD_REQUEST,
        'You are already enrolled in this course',
      );
    }

    // 4. Check credit limit
    const semesterReg = await SemesterRegistration.findById(
      offeredCourse.semesterRegistration,
    )
      .select('maxCredit')
      .session(session);

    if (!semesterReg) {
      throw new AppError(status.BAD_REQUEST, 'Semester registration not found');
    }

    const enrolledCourses = await EnrolledCourse.aggregate([
      {
        $match: {
          semesterRegistration: offeredCourse.semesterRegistration,
          student: student._id,
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },
      { $unwind: '$courseDetails' },
      {
        $group: {
          _id: null,
          totalCredits: { $sum: '$courseDetails.credit' },
        },
      },
    ]).session(session);

    const currentCredits = enrolledCourses[0]?.totalCredits || 0;

    if (currentCredits + course?.credit > semesterReg.maxCredit) {
      throw new AppError(
        status.CONFLICT,
        'You have exceeded the maximum allowed credits',
      );
    }

    // 5. Enroll course
    const enrollment = await EnrolledCourse.create(
      [
        {
          semesterRegistration: offeredCourse.semesterRegistration,
          academicSemester: offeredCourse.academicSemester,
          academicFaculty: offeredCourse.academicFaculty,
          academicDepartment: offeredCourse.academicDepartment,
          offeredCourse: offeredCourse._id,
          course: offeredCourse.course,
          student: student._id,
          faculty: offeredCourse.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!enrollment.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to enroll in the course');
    }

    // 6. Decrease max capacity
    await OfferCourse.findByIdAndUpdate(
      offeredCourse._id,
      { $inc: { maxCapacity: -1 } },
      { session },
    );

    await session.commitTransaction();
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      error?.message || 'Enrollment process failed',
    );
  } finally {
    await session.endSession();
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExist) {
    throw new AppError(status.BAD_REQUEST, 'Semester registration not found');
  }

  const isOfferCourseSectionExist = await OfferCourse.findById(offeredCourse);

  if (!isOfferCourseSectionExist) {
    throw new AppError(status.BAD_REQUEST, 'Offered course not found');
  }

  const isStudentExist = await Student.findById(student);

  if (!isStudentExist) {
    throw new AppError(status.BAD_REQUEST, 'Student not found');
  }

  const isFacultyExist = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!isFacultyExist) {
    throw new AppError(status.FORBIDDEN, 'Faculty not found');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: isFacultyExist,
  });

  //update marks:
  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  //calculate total marks and update:
  if (courseMarks?.finalTerm && isCourseBelongToFaculty) {
    const { classTest1, midTerm, classTest2, finalTerm }: TEnrolledCourseMarks =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks = classTest1 + midTerm + classTest2 + finalTerm;

    const result = calculateGradeAndPoint(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findOneAndUpdate(
    isCourseBelongToFaculty?._id,
    modifiedData,
    {
      new: true,
      reValidate: true,
    },
  );

  return result;
};
export const enrolledCourseService = {
  getAllEnrolledCourseFromDB,
  getSingleEnrolledCourseFromDB,
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
