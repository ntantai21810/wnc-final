import { z } from "zod";

export interface IAccountFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  indentityNumber: string;
  balance: string | number;
}

export const accountSchema = z.object({
  username: z.string().min(1, "This field is required."),
  firstName: z.string().min(1, "This field is required."),
  lastName: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "This field is required."),
  address: z.string().min(1, "This field is required."),
  indentityNumber: z.string().min(1, "This field is required."),
  balance: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
});

export interface IChargeMoneyFormData {
  accountNumber: string;
  amount: string | number;
}

export const chargeMoneySchema = z.object({
  accountNumber: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
  amount: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
});
