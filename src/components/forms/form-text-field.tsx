"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./password-input";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  placeholder?: string;
  description?: React.ReactNode;
  className?: string;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  description,
  className,
}: FormTextFieldProps<T>) {
  const InputComponent = type === "password" ? PasswordInput : Input;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const descriptionId = description ? `${field.name}-description` : undefined;
        return (
          <Field data-invalid={fieldState.invalid} className={cn("gap-2", className)}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <InputComponent
              {...field}
              value={field.value ?? ""}
              id={field.name}
              type={type === "password" ? undefined : type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              aria-describedby={descriptionId}
              className="h-11 rounded-xl bg-background/60"
            />
            {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
