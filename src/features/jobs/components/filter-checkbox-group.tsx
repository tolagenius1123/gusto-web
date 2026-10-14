"use client";

import type { LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
}

interface FilterCheckboxGroupProps<T extends string> {
  id: string;
  legend: string;
  options: FilterOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
}

export function FilterCheckboxGroup<T extends string>({
  id,
  legend,
  options,
  selected,
  onChange,
}: FilterCheckboxGroupProps<T>) {
  function toggle(value: T, checked: boolean) {
    onChange(checked ? [...selected, value] : selected.filter((item) => item !== value));
  }

  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{legend}</legend>
      {options.map(({ value, label, icon: Icon }) => {
        const inputId = `${id}-${value}`;
        return (
          <div key={value} className="flex items-center gap-2.5">
            <Checkbox
              id={inputId}
              checked={selected.includes(value)}
              onCheckedChange={(checked) => toggle(value, checked)}
            />
            <Label htmlFor={inputId} className="flex cursor-pointer items-center gap-1.5 font-normal">
              {Icon && <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />}
              {label}
            </Label>
          </div>
        );
      })}
    </fieldset>
  );
}
