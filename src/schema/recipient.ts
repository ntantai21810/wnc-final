import { z } from "zod";

export interface IRecipientFormData {
  accountNumber: string;
  suggestedName: string | null;
  bankDestinationId: number | "" | null;

  //Handle on client
  isSameBank: boolean;
}

export const recipientSchema = z
  .object({
    accountNumber: z
      .string()
      .min(1, "This field is required.")
      .refine((data) => !data || /^[0-9]*$/.test(data), "Number expected."),
    suggestedName: z.string(),
    bankDestinationId: z.number().or(z.string()),
    isSameBank: z.boolean(),
  })
  .refine(
    (data) => data.isSameBank || (!data.isSameBank && data.bankDestinationId),
    { message: "This field is required", path: ["bankDestinationId"] }
  );
