import { z } from 'zod';

export const loginValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'old password is required' }),
    newPassword: z.string({ required_error: 'new password is required' }),
  }),
});

export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'refresh token is required' }),
  }),
});

export const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
  }),
});

export const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    newPassword:z.string({
      required_error:'user password is required',
    })
  }),
});

export const AuthValidation = z.object({
  loginValidation,
  changePasswordValidation,
  refreshTokenValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
});
