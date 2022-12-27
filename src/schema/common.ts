import { z } from "zod";

export const email = z
  .string()
  .min(1, { message: "This field is required" })
  .email("Please input a valid email address.");

export const password = z.string().min(1, "This field is required.");
export const username = z.string().min(1, "This field is required.");
