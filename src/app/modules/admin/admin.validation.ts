import { z } from 'zod';

export const createAdminValidation = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      name: z.string(),
      email: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const updateAdminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const AdminValidation = {
  createAdminValidation,
  updateAdminValidation,
};
