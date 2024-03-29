import { Dayjs } from "dayjs";
import { z } from "zod";

export interface IDebitFormData {
  accountNumber: string;
  selfInDebt: boolean;
  amount: number | "";
  description: string;
  dateDue: string | Dayjs | null;
  bankDestinationId: number | "" | null;

  //Handle on client
  isSameBank: boolean;
}

export const debitSchema = z.object({
  accountNumber: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
  selfInDebt: z.boolean(),
  amount: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
  description: z.string().min(1, "This field is required."),
  dateDue: z.any().refine(Boolean, "This field is required."),
  bankDestinationId: z.number().or(z.string()),

  //Handle on client
  isSameBank: z.boolean(),
});

export interface IDeleteDebitFormData {
  description: string;
}

export const deleteDebitSchema = z.object({
  description: z.string().min(1, "This field is required."),
});

export interface IPayDebitFormData {
  otp: string;
}

export const payDebitSchema = z.object({
  otp: z.string().min(1, "This field is required."),
});
