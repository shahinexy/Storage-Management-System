import { z } from "zod";

const createAccountValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  }),
});

const loginAccountValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(8, "Old password required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  }),
});

export const AuthValidations = {
  createAccountValidationSchema,
  loginAccountValidationSchema,
  changePasswordValidationSchema
};
