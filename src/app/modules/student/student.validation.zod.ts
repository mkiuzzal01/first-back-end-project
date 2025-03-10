import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot exceed 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  relationShip: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const studentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB-', 'AB+', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidation = {
  studentValidationSchema,
};
