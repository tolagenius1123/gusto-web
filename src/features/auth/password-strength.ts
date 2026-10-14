import { PASSWORD_MIN_LENGTH } from "@/lib/validation/auth";

export const strengthLabels = ["Too short", "Weak", "Fair", "Strong", "Very strong"] as const;

export function getPasswordStrength(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH) return 0;
  const checks = [
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 16,
  ];
  return Math.max(1, checks.filter(Boolean).length);
}
