import { z } from 'zod';

const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

export const createFacultiesValidation = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string(),
      name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
      gender: z.string(),
      dateOfBirth: z.string(),
      email: z.string().email(),
      emergencyContactNo: z.string(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().url().optional(),
      academicDepartment: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const updateFacultiesValidation = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      gender: z.string().optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImage: z.string().url().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const facultiesValidation = {
  createFacultiesValidation,
  updateFacultiesValidation,
};
