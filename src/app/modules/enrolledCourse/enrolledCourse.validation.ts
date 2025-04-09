import { z } from 'zod';

export const createEnrolledCourseValidation = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const updateEnrolledCourseMarksValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const EnrolledCourseValidation = {
  createEnrolledCourseValidation,
  updateEnrolledCourseMarksValidationSchema,
};
