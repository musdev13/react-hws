import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(3, "Ім'я занадто коротке (мінімум 3 символи)"),
    email: z.string().email('Некоректний email'),
    password: z.string().min(8, 'Мінімум 8 символів'),
    passwordComfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordComfirm, {
    message: 'Паролі не збігаються',
    path: ['passwordComfirm'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;