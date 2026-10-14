"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, MailCheckIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormTextField } from "@/components/forms/form-text-field";
import { simulateRequest } from "@/lib/mock-request";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation/auth";
import { AuthHeader } from "./auth-header";
import { AuthLink } from "./auth-link";
import { SubmitButton } from "./submit-button";

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    await simulateRequest();
    setSentTo(values.email);
  }

  if (sentTo) {
    return (
      <div className="animate-rise space-y-6 text-center" role="status">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-success/15">
          <MailCheckIcon aria-hidden="true" className="size-8 text-success" />
        </span>
        <AuthHeader
          title="Check your inbox"
          description={
            <>
              If an account exists for <strong className="text-foreground">{sentTo}</strong>, we have sent a link to
              reset your password. The link expires in 30 minutes.
            </>
          }
        />
        <p className="text-sm">
          <AuthLink href="/sign-in">Back to sign in</AuthLink>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AuthHeader
        title="Reset your password"
        description="Enter the email you signed up with and we will send you a reset link."
      />
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormTextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />
        <SubmitButton isPending={form.formState.isSubmitting} pendingLabel="Sending link...">
          Send reset link
        </SubmitButton>
      </form>
      <p className="text-center text-sm">
        <AuthLink href="/sign-in">
          <ArrowLeftIcon aria-hidden="true" className="mr-1 inline size-4" />
          Back to sign in
        </AuthLink>
      </p>
    </div>
  );
}
