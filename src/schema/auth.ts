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

export interface IChangePasswordFormData {
  password: string;
  newPassword: string;
  reNewPassword: string;
}

export const changePasswordSchema = z
  .object({
    password: z.string().min(1, "This field is required."),
    newPassword: z.string().min(1, "This field is required."),
    reNewPassword: z.string(),
  })
  .refine(
    (data) =>
      !data.newPassword ||
      (data.newPassword && data.newPassword === data.reNewPassword),
    { message: "Password does not match", path: ["reNewPassword"] }
  );

export interface IForgotPasswordFormData {
  username: string;
  password: string;
  otp: string;

  //Handle on client
  step: number;
}

export const forgotPasswordSchema = z
  .object({
    username: z.string().min(1, "This field is required."),
    password: z.string(),
    otp: z.string(),
    step: z.number(),
  })
  .refine((data) => data.step !== 1 || (data.step === 1 && data.otp), {
    message: "This field is required.",
    path: ["otp"],
  })
  .refine((data) => data.step !== 2 || (data.step === 2 && data.password), {
    message: "This field is required.",
    path: ["password"],
  });
