import { z } from 'zod';
import { Days } from './offerCourse.constant';

export const createOfferedCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.string(),
    maxCapacity: z.number(),
    days: z.enum([...Days] as [string, string]),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const updateOfferedCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string().optional(),
    academicSemester: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    course: z.string().optional(),
    faculty: z.string().optional(),
    section: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum([...Days] as [string, string]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offerCourseValidations = {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
};
