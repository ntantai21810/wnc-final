import * as z from "zod";
import { email, password, username } from "./common";

export interface ILoginFormData {
  username: string;
  password: string;
}

export const loginSchema = z.object({
  username,
  password,
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
