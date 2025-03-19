import { z } from 'zod';

export const createAcademicFacultyValidation = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      name: z.string({
        invalid_type_error: 'Academic faculty must be string',
      }),
      isDeleted: z.boolean(),
    }),
  }),
});

export const updateAcademicFacultyValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.string({
        invalid_type_error: 'Academic faculty must be string',
      }).optional(),
      isDeleted: z.boolean().optional()
    }),
  }),
});


export const FacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};
