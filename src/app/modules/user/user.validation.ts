import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'Password must be at least 20 characters' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
