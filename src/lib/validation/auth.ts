import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 12;

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .pipe(z.email("Enter a valid email address").max(254));

const nameSchema = (label: string) => z.string().trim().min(1, `Enter your ${label}`).max(80, `${label} is too long`);

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password").max(128),
  rememberMe: z.boolean(),
});

export const signUpSchema = z.object({
  firstName: nameSchema("first name"),
  lastName: nameSchema("last name"),
  email: emailSchema,
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(128, "Password is too long"),
  acceptTerms: z.boolean().refine(Boolean, "You must accept the terms to continue"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
