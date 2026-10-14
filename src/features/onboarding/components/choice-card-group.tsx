"use client";

import type { LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

interface ChoiceCardGroupProps<T extends string> {
  id: string;
  legend: string;
  options: ChoiceOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  error?: { message?: string };
  columns?: 2 | 3;
}

export function ChoiceCardGroup<T extends string>({
  id,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: ChoiceCardGroupProps<T>) {
  function toggle(option: T, checked: boolean) {
    onChange(checked ? [...value, option] : value.filter((item) => item !== option));
  }

  return (
    <FieldSet data-invalid={Boolean(error)}>
      <FieldLegend variant="label">{legend}</FieldLegend>
      <div className={cn("grid gap-2", columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>
        {options.map(({ value: optionValue, label, icon: Icon }) => {
          const inputId = `${id}-${optionValue}`;
          return (
            <FieldLabel key={optionValue} htmlFor={inputId} className="rounded-xl">
              <Field orientation="horizontal" className="items-center">
                <Checkbox
                  id={inputId}
                  checked={value.includes(optionValue)}
                  onCheckedChange={(checked) => toggle(optionValue, checked)}
                />
                {Icon && <Icon aria-hidden="true" className="size-4 text-muted-foreground" />}
                <span className="text-sm font-medium">{label}</span>
              </Field>
            </FieldLabel>
          );
        })}
      </div>
      {error && <FieldError errors={[error]} />}
    </FieldSet>
  );
}
