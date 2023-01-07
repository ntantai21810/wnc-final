import { z } from "zod";

export interface IStaffFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  indentityNumber: string;
  balance: number;

  //Handle on client
}

export const staffSchema = z.object({
  username: z.string().min(1, "This field is required."),
  firstName: z.string().min(1, "This field is required."),
  lastName: z.string().min(1, "This field is required."),
  email: z.string().min(1, "This field is required.").email("Invalid email"),
  phone: z.string().min(1, "This field is required."),
  address: z.string().min(1, "This field is required."),
  indentityNumber: z.string().min(1, "This field is required."),
  balance: z.number(),
});
