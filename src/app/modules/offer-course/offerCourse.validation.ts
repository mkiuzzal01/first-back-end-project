import { z } from 'zod';
import { Days } from './offerCourse.constant';

const regex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const timeStringSchema = z.string().refine(
  (time) => {
    return regex.test(time);
  },
  {
    message: 'Invalid time format. Expected HH:MM (24-hour format).',
  },
);

export const createOfferedCourseValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum(Days as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01 ${body.startTime}:00`);
        const endTime = new Date(`1970-01-01 ${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'End time must be greater than start time.',
      },
    ),
});

export const updateOfferedCourseValidation = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum(Days as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        if (body.startTime && body.endTime) {
          const startTime = new Date(`1970-01-01 ${body.startTime}:00`);
          const endTime = new Date(`1970-01-01 ${body.endTime}:00`);
          return endTime > startTime;
        }
        return true;
      },
      {
        message: 'End time must be greater than start time.',
      },
    ),
});

export const offerCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
