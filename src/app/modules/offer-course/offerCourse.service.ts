import { TOfferCourse } from './offerCourse.interface';
import { OfferCourse } from './offerCourse.model';

const createOfferCourseIntoDB = async (payload: TOfferCourse) => {
  const result = await OfferCourse.create(payload);
  return result;
};

const updateOfferCourseIntoDB = (id: string) => {

};

const deleteOfferCourseFromDB = () => {
  // Code to delete offer course from DB goes here
};

const getAllOfferCoursesFromDB = () => {
  // Code to get all offer courses from DB goes here
};

const getSingleOfferCourseFromDB = () => {
  // Code to get single offer course from DB goes here
};

export const offerCoursesService = {
  createOfferCourseIntoDB,
  updateOfferCourseIntoDB,
  deleteOfferCourseFromDB,
  getAllOfferCoursesFromDB,
  getSingleOfferCourseFromDB,
};
