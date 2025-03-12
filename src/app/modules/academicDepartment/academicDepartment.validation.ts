import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'name is required'),
    academicFaculty: z.string().min(1, 'academicFaculty is required'),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name is string',
      required_error: 'name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academicFaculty is string',
      required_error: 'academicFaculty is required',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
