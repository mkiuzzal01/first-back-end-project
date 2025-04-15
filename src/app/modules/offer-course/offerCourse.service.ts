import status from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semester-registration/semesterRegistration.model';
import { TOfferCourse } from './offerCourse.interface';
import { OfferCourse } from './offerCourse.model';
import { AcademicDepartment } from '../academic-department/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculties } from '../faculties/faculties.model';
import { hasTimeConflict } from './offerCourse.utils';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { offeredCoursesSearchableField } from './offerCourse.constant';
import { Student } from '../student/student.model';

const createOfferCourseIntoDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(status.NOT_FOUND, 'Semester registration not found');
  }

  const isAcademicSemesterExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicSemesterExist) {
    throw new AppError(status.NOT_FOUND, 'Academic semester not found');
  }

  const isCourse = await Course.findById(course);
  if (!isCourse) {
    throw new AppError(status.NOT_FOUND, 'Course not found');
  }

  const isFaculty = await Faculties.findById(faculty);
  if (!isFaculty) {
    throw new AppError(status.NOT_FOUND, 'Faculty not found');
  }

  const isSectionExist = await OfferCourse.findOne({
    semesterRegistration,
    course,
    section,
    faculty: isFaculty._id,
  });

  if (isSectionExist) {
    throw new AppError(
      status.CONFLICT,
      'Offer course with the same semester registration, course, and section already exists',
    );
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      status.FORBIDDEN,
      'Academic department does not belong to the specified faculty',
    );
  }

  // get the schedules of the faculties:
  const assignedSchedules = await OfferCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days section startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  // check if the new schedule conflicts with existing schedules:
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(status.CONFLICT, 'Time conflict with existing schedule');
  }

  //finally create new schedule:
  const academicSemester = isSemesterRegistrationExist.academicSemester;
  const result = await OfferCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferCourseIntoDB = async (id: string, payload: TOfferCourse) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferCourseExist = await OfferCourse.findById(id);
  if (!isOfferCourseExist) {
    throw new AppError(status.NOT_FOUND, 'Offer course not found');
  }

  const isFaculty = await Faculties.findById(faculty);
  if (!isFaculty) {
    throw new AppError(status.NOT_FOUND, 'Faculty not found');
  }

  //get the schedule of the faculties:
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferCourseExist.semesterRegistration,
  );
  if (semesterRegistration?.status !== 'UPCOMING') {
    throw new AppError(
      status.FORBIDDEN,
      'Cannot update ONGOING semester to UPCOMING status',
    );
  }
  const assignedSchedule = await OfferCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  });

  const newSchedule = {
    days,
    startTime: startTime,
    endTime: endTime,
  };

  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(status.CONFLICT, 'Time conflict with existing schedule');
  }

  const result = await OfferCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const deleteOfferCourseFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isOfferCourseExist = await OfferCourse.findById(id);
    if (!isOfferCourseExist) {
      throw new AppError(status.NOT_FOUND, 'Offer course not found');
    }
  } catch (error) {}
};

const getAllOfferCoursesFromDB = async (query: Record<string, unknown>) => {
  const coursesFind = OfferCourse.find();
  const courseQuery = new QueryBuilder(coursesFind, query)
    .search(offeredCoursesSearchableField)
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleOfferCourseFromDB = async (id: string) => {
  const result = await OfferCourse.findOne({ course: id }).populate('course');
  return result;
};

const getMyOfferCoursesFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const isStudentExist = await Student.findOne({ id });

  if (!isStudentExist) {
    throw new AppError(status.NOT_FOUND, 'Student not found');
  }

  const currentOngoingSemester = await SemesterRegistration.findOne({
    status: 'ONGOING',
  });

  if (!currentOngoingSemester) {
    throw new AppError(status.NOT_FOUND, 'there is no ongoing semester');
  }

  //pagination:
  const page = Number(query.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingSemester._id,
        academicFaculty: isStudentExist.academicFaculty,
        academicDepartment: isStudentExist.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingSemester: currentOngoingSemester._id,
          currentStudent: isStudentExist._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$semesterRegistration', '$$currentOngoingSemester'],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: isStudentExist._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCoursesIds',
      },
    },
    {
      $addFields: {
        completedCourses: {
          $map: {
            input: '$completedCoursesIds',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },

    {
      $addFields: {
        isPreRequisiteFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCoursesIds',
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteFulFilled: true,
      },
    },
  ];

  const result = await OfferCourse.aggregate([...aggregationQuery, ...paginationQuery]);

  const total = (await OfferCourse.aggregate(aggregationQuery)).length;
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    result
  };
};

export const offerCoursesService = {
  createOfferCourseIntoDB,
  updateOfferCourseIntoDB,
  deleteOfferCourseFromDB,
  getAllOfferCoursesFromDB,
  getSingleOfferCourseFromDB,
  getMyOfferCoursesFromDB,
};
