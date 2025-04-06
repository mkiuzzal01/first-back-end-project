import { z } from 'zod';
import { USER_STATUS } from './user.constant';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'Password must be at least 20 characters' })
    .optional(),
});

export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});

export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
