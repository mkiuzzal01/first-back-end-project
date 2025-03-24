import { Types } from 'mongoose';

export type TDays = ['SAT' | 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI'];

export type TSchedule = {
  days: TDays;
  startTime: String;
  endTime: String;
};

export type TOfferCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays;
  startTime: String;
  endTime: String;
};
