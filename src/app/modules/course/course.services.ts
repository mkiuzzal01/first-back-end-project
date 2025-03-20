import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { preRequisiteCourses, ...remainingCourses } = payload;

    const updateBasicInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourses,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicInfo) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update basic info');
    }

    if (Array.isArray(preRequisiteCourses) && preRequisiteCourses.length > 0) {
      // Filter out prerequisites courses marked for deletion
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      if (deletedPreRequisite.length > 0) {
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: { $in: deletedPreRequisite },
              },
            },
          },
          { session },
        );

        if (!deletedPreRequisiteCourses) {
          throw new AppError(
            status.BAD_REQUEST,
            'Failed to delete pre-requisite courses',
          );
        }
      }

      // Filter out new prerequisite courses to add
      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      if (newPreRequisite.length > 0) {
        const addNewPreRequisiteCourse = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisiteCourses: { $each: newPreRequisite },
            },
          },
          { session },
        );

        if (!addNewPreRequisiteCourse) {
          throw new AppError(
            status.BAD_REQUEST,
            'Failed to add new pre-requisite courses',
          );
        }
      }
    }

    const result = await Course.findById(id)
      .populate('preRequisiteCourses.course')
      .session(session);

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseFind = Course.find().populate('preRequisiteCourses.course');
  const courseQuery = new QueryBuilder(courseFind, query)
    .search(courseSearchableField)
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

const assignCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

export const CourseService = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  assignCourseFacultyIntoDB,
};
