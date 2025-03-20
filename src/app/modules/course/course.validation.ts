import { z } from 'zod';

const preRequisiteCourseValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

export const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.string(),
    credit: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// for update data validation:
const updatePreRequisiteCourseValidation = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const updateCreateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.string().optional(),
    credit: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseValidation).optional(),
  }),
});

export const assignCourseFacultyToCourseValidation = z.object({
  body: z.object({
    course: z.string(),
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidation,
  updateCreateCourseValidation,
};
