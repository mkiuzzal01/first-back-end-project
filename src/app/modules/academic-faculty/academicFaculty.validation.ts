import { z } from 'zod';

export const createAcademicFacultyValidation = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string({
        invalid_type_error: 'Academic faculty must be string',
      }),
    }),
  }),
});

export const updateAcademicFacultyValidation = z.object({
  body: z.object({
    academicFaculty: z.object({
      name: z.string({
        invalid_type_error: 'Academic faculty must be string',
      }).optional(),
    }),
  }),
});

export const FacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};
