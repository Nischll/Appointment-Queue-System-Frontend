import {
  zod_dateMin,
  zod_email,
  zod_fullName,
  zod_phoneNumber,
  zod_quantity,
  zod_singleSelectDropdown,
  zod_password,
  zod_username,
} from "@/utility/validator";
import z from "zod";

export const productQuantitySchema = z.object({
  branchId: zod_singleSelectDropdown(),
  quantity: zod_quantity(),
  batchNumber: z.any().optional(),
  expiryDate: zod_dateMin(),
});

export const removeProductQuantitySchema = z.object({
  branchId: zod_singleSelectDropdown(),
  quantity: zod_quantity(),
  batchNumber: z
    .string()
    .min(1, "Required")
    .max(10, "Batch number exceeds more than 10 letters"),
});

export const patientSchema = z.object({
  fullName: zod_fullName(),
  address: z
    .string()
    .min(1, "Required")
    .max(18, "Address exceeds more than 18 letters")
    .or(z.literal("")),
  phoneNumber: zod_phoneNumber(),
  email: zod_email().or(z.literal("")),
});

export const signupSchema = z.object({
  full_name: zod_fullName(),
  username: zod_username(),
  email: zod_email(),
  password: zod_password(),
  phone: zod_phoneNumber(),
  gender: z.enum(["M", "F"], {
    required_error: "Gender is required.",
    invalid_type_error: "Gender must be either M or F.",
  }),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "Invalid date format.",
    })
    .transform((val) => {
      // Ensure YYYY-MM-DD format
      return new Date(val).toISOString().split("T")[0];
    }),
  age: z.number().nullable().optional(),
});
