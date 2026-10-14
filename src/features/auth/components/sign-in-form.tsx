"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormTextField } from "@/components/forms/form-text-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { simulateRequest } from "@/lib/mock-request";
import { signInSchema, type SignInValues } from "@/lib/validation/auth";
import { AuthHeader } from "./auth-header";
import { AuthLink } from "./auth-link";
import { SubmitButton } from "./submit-button";

export function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  async function onSubmit() {
    await simulateRequest();
    toast.success("Welcome back");
    router.push("/feed");
  }

  return (
    <div className="space-y-8">
      <AuthHeader
        title="Welcome back"
        description={
          <>
            New to Gusto HSE? <AuthLink href="/sign-up">Create an account</AuthLink>
          </>
        }
      />
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="gap-5">
          <FormTextField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          <div className="space-y-2">
            <FormTextField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Link
              href="/forgot-password"
              className="ml-auto block w-fit rounded-sm text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Forgot password?
            </Link>
          </div>
          <Controller
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                <FieldLabel htmlFor="rememberMe" className="font-normal">
                  Keep me signed in
                </FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>
        <SubmitButton isPending={form.formState.isSubmitting} pendingLabel="Signing in...">
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
}
