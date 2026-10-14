"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormTextField } from "@/components/forms/form-text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { simulateRequest } from "@/lib/mock-request";
import { signUpSchema, type SignUpValues } from "@/lib/validation/auth";
import { AuthHeader } from "./auth-header";
import { AuthLink } from "./auth-link";
import { PasswordStrengthMeter } from "./password-strength-meter";
import { SubmitButton } from "./submit-button";

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", acceptTerms: false },
  });
  const password = useWatch({ control: form.control, name: "password" });

  async function onSubmit() {
    await simulateRequest();
    router.push("/onboarding");
  }

  return (
    <div className="space-y-8">
      <AuthHeader
        title="Join Gusto HSE"
        description={
          <>
            Already have an account? <AuthLink href="/sign-in">Sign in</AuthLink>
          </>
        }
      />
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormTextField control={form.control} name="firstName" label="First name" autoComplete="given-name" />
            <FormTextField control={form.control} name="lastName" label="Last name" autoComplete="family-name" />
          </div>
          <FormTextField
            control={form.control}
            name="email"
            label="Work or personal email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          <div className="space-y-3">
            <FormTextField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              description="At least 12 characters. A longer passphrase is stronger."
            />
            <PasswordStrengthMeter password={password} />
          </div>
          <Controller
            control={form.control}
            name="acceptTerms"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="mt-0.5"
                  />
                  <FieldLabel htmlFor="acceptTerms" className="block font-normal leading-relaxed text-muted-foreground">
                    I agree to the <AuthLink href="/terms">Terms of Service</AuthLink> and{" "}
                    <AuthLink href="/privacy">Privacy Policy</AuthLink>
                  </FieldLabel>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <SubmitButton isPending={form.formState.isSubmitting} pendingLabel="Creating your account...">
          Create account
        </SubmitButton>
      </form>
    </div>
  );
}
