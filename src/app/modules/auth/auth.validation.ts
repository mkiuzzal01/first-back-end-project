import { z } from 'zod';

export const loginValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const AuthValidation = z.object({
  loginValidation,
});
