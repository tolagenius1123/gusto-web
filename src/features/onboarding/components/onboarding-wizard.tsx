"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormTextField } from "@/components/forms/form-text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { experienceLabels, experienceLevels } from "@/config/experience-levels";
import { industries, industryConfig } from "@/config/industries";
import { siteTypeConfig, siteTypes } from "@/config/site-types";
import { simulateRequest } from "@/lib/mock-request";
import { commonCertifications, onboardingSchema, onboardingSteps, type OnboardingValues } from "../onboarding-schema";
import { ChoiceCardGroup } from "./choice-card-group";
import { OnboardingStepper } from "./onboarding-stepper";

export function OnboardingWizard({ firstName }: { firstName: string }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      headline: "",
      industries: [],
      siteTypes: [],
      location: "",
      certifications: [],
      openToWork: false,
    },
  });

  const step = onboardingSteps[stepIndex];
  const isLastStep = stepIndex === onboardingSteps.length - 1;

  async function goNext() {
    const isValid = await form.trigger([...step.fields]);
    if (isValid) setStepIndex((index) => index + 1);
  }

  async function onSubmit() {
    await simulateRequest();
    toast.success(`Welcome to Gusto HSE, ${firstName}. Your profile is ready.`);
    router.push("/feed");
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-caution uppercase">
          Step {stepIndex + 1} of {onboardingSteps.length}
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-wide uppercase sm:text-4xl">{step.title}</h1>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </header>

      <OnboardingStepper steps={onboardingSteps} currentIndex={stepIndex} />

      <form
        noValidate
        onSubmit={isLastStep ? form.handleSubmit(onSubmit) : (event) => {
          event.preventDefault();
          void goNext();
        }}
      >
        <Card className="rounded-2xl px-5 sm:px-6">
          <div key={step.id} className="animate-rise">
            {step.id === "role" && (
              <FieldGroup className="gap-6">
                <FormTextField
                  control={form.control}
                  name="headline"
                  label="Current job title"
                  placeholder="e.g. HSE Officer, Safety Supervisor"
                  autoComplete="organization-title"
                />
                <Controller
                  control={form.control}
                  name="experienceLevel"
                  render={({ field, fieldState }) => (
                    <FieldSet data-invalid={fieldState.invalid}>
                      <FieldLegend variant="label">Experience level</FieldLegend>
                      <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="grid gap-2 sm:grid-cols-2">
                        {experienceLevels.map((level) => (
                          <FieldLabel key={level} htmlFor={`experience-${level}`} className="rounded-xl">
                            <Field orientation="horizontal" className="items-center">
                              <RadioGroupItem id={`experience-${level}`} value={level} aria-invalid={fieldState.invalid} />
                              <span className="text-sm font-medium">{experienceLabels[level]}</span>
                            </Field>
                          </FieldLabel>
                        ))}
                      </RadioGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldSet>
                  )}
                />
              </FieldGroup>
            )}

            {step.id === "work" && (
              <FieldGroup className="gap-6">
                <Controller
                  control={form.control}
                  name="industries"
                  render={({ field, fieldState }) => (
                    <ChoiceCardGroup
                      id="industry"
                      legend="Industries"
                      options={industries.map((value) => ({ value, label: industryConfig[value].label, icon: industryConfig[value].icon }))}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="siteTypes"
                  render={({ field, fieldState }) => (
                    <ChoiceCardGroup
                      id="site"
                      legend="Site types you work on"
                      options={siteTypes.map((value) => ({ value, ...siteTypeConfig[value] }))}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                />
                <FormTextField
                  control={form.control}
                  name="location"
                  label="Location"
                  placeholder="e.g. Lagos, Nigeria"
                  autoComplete="address-level2"
                />
              </FieldGroup>
            )}

            {step.id === "certifications" && (
              <FieldGroup className="gap-6">
                <Controller
                  control={form.control}
                  name="certifications"
                  render={({ field, fieldState }) => (
                    <ChoiceCardGroup
                      id="certification"
                      legend="Certifications you hold"
                      options={commonCertifications.map((value) => ({ value, label: value, icon: ShieldCheckIcon }))}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="openToWork"
                  render={({ field }) => (
                    <Field orientation="horizontal" className="items-center justify-between rounded-xl border border-success/30 bg-success/10 p-4">
                      <FieldLabel htmlFor="openToWork" className="flex-col items-start gap-0.5">
                        <span className="font-semibold">Open to work</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          Show a green Open to work ring on your profile photo.
                        </span>
                      </FieldLabel>
                      <Switch id="openToWork" checked={field.value} onCheckedChange={field.onChange} />
                    </Field>
                  )}
                />
              </FieldGroup>
            )}
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-between gap-3">
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" className="rounded-full" onClick={() => setStepIndex((index) => index - 1)}>
              <ArrowLeftIcon aria-hidden="true" />
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-11 rounded-full px-6 shadow-[0_0_24px_-6px_var(--primary)]"
          >
            {form.formState.isSubmitting && <Spinner aria-hidden="true" />}
            {isLastStep ? (form.formState.isSubmitting ? "Setting up your profile..." : "Finish setup") : "Continue"}
            {!isLastStep && <ArrowRightIcon aria-hidden="true" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
