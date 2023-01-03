import * as z from "zod";
import { email, password, username } from "./common";

export interface ILoginFormData {
  username: string;
  password: string;
  recaptchaToken: string | null;
}

export const loginSchema = z.object({
  username,
  password,
  recaptchaToken: z
    .string()
    .min(1, "This field is required")
    .or(z.any().refine(Boolean, "This field is required.")),
});

export const signupSchema = z
  .object({
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match.",
    path: ["confirmPassword"],
  });
