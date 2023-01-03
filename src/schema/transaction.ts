import { z } from "zod";

export interface ITransactionFormData {
  toAccountNumber: string;
  amount: number | "";
  bankId: number | "";
  chargeReceiver: boolean | number;
  description: string;
  OTP: string;

  //Handle on client
  selectFromList: boolean;
  recipientId: number | "";
}

export const transactionSchema = z.object({
  toAccountNumber: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
  amount: z
    .string()
    .min(1, "This field is required.")
    .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
  bankId: z.string().or(z.number()),
  chargeReceiver: z.boolean().or(z.number()),
  description: z.string().min(1, "This field is required."),
  OTP: z.string(),

  //Handle on client
  selectFromList: z.boolean(),
  recipientId: z.number().or(z.string()),
});
