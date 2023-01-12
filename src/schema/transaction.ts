import { z } from "zod";

export interface ITransactionFormData {
  toAccountNumber: string;
  amount: number | "";
  bankId: number | "" | null;
  chargeReceiver: boolean | number;
  description: string;
  otp: string;

  //Handle on client
  selectFromList: boolean;
  recipientId: number | "";
  step: number;
}

export const transactionSchema = z
  .object({
    toAccountNumber: z
      .string()
      // .min(1, "This field is required.")
      .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
    amount: z
      .string()
      .min(1, "This field is required.")
      .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
    bankId: z.string().or(z.number()),
    chargeReceiver: z.boolean().or(z.number()),
    description: z.string().min(1, "This field is required."),
    otp: z.string(),

    //Handle on client
    selectFromList: z.boolean(),
    recipientId: z.number().or(z.string()),
    step: z.number(),
  })
  .refine((data) => data.step !== 1 || (data.step === 1 && data.otp), {
    message: "This field is required.",
    path: ["OTP"],
  })
  .refine(
    (data) =>
      data.selectFromList || (!data.selectFromList && data.toAccountNumber),
    { message: "This field is required.", path: ["toAccountNumber"] }
  );
