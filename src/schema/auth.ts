import * as z from 'zod';
import { email, password } from './common';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignupFormData extends ILoginFormData {
  confirmPassword: string;
}

export const loginSchema = z.object({
  email,
  password,
});

export const signupSchema = z
  .object({
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match.',
    path: ['confirmPassword'],
  });
