"use client";

import { ShieldCheckIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { industries, industryConfig } from "@/config/industries";
import type { WorkplaceType } from "@/types/job";
import type { JobFilters, RotationFilter } from "../filter-jobs";
import { experienceLabels, experienceLevels, siteTypeConfig, siteTypes, workplaceLabels } from "../job-options";
import { FilterCheckboxGroup } from "./filter-checkbox-group";

const rotationOptions: { value: RotationFilter; label: string }[] = [
  { value: "any", label: "Any schedule" },
  { value: "rotational", label: "Rotational (14/14, 28/28...)" },
  { value: "fixed", label: "Fixed (Mon to Fri, shifts)" },
];

interface JobFiltersPanelProps {
  idPrefix: string;
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function JobFiltersPanel({ idPrefix, filters, onChange }: JobFiltersPanelProps) {
  const update = <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => onChange({ ...filters, [key]: value });
  const qualifiedId = `${idPrefix}-qualified`;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-success/30 bg-success/10 p-3">
        <Label htmlFor={qualifiedId} className="flex cursor-pointer items-center gap-2 text-sm">
          <ShieldCheckIcon aria-hidden="true" className="size-4 text-success" />
          Only jobs I&apos;m qualified for
        </Label>
        <Switch
          id={qualifiedId}
          checked={filters.qualifiedOnly}
          onCheckedChange={(checked) => update("qualifiedOnly", checked)}
        />
      </div>

      <FilterCheckboxGroup
        id={`${idPrefix}-site`}
        legend="Site type"
        options={siteTypes.map((value) => ({ value, ...siteTypeConfig[value] }))}
        selected={filters.siteTypes}
        onChange={(value) => update("siteTypes", value)}
      />
      <Separator />

      <fieldset className="space-y-2.5">
        <legend className="mb-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Schedule</legend>
        <RadioGroup value={filters.rotation} onValueChange={(value) => update("rotation", value as RotationFilter)}>
          {rotationOptions.map((option) => {
            const inputId = `${idPrefix}-rotation-${option.value}`;
            return (
              <div key={option.value} className="flex items-center gap-2.5">
                <RadioGroupItem id={inputId} value={option.value} />
                <Label htmlFor={inputId} className="cursor-pointer font-normal">
                  {option.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </fieldset>
      <Separator />

      <FilterCheckboxGroup
        id={`${idPrefix}-industry`}
        legend="Industry"
        options={industries.map((value) => ({ value, label: industryConfig[value].label, icon: industryConfig[value].icon }))}
        selected={filters.industries}
        onChange={(value) => update("industries", value)}
      />
      <Separator />

      <FilterCheckboxGroup
        id={`${idPrefix}-experience`}
        legend="Experience level"
        options={experienceLevels.map((value) => ({ value, label: experienceLabels[value] }))}
        selected={filters.experience}
        onChange={(value) => update("experience", value)}
      />
      <Separator />

      <FilterCheckboxGroup
        id={`${idPrefix}-workplace`}
        legend="Workplace"
        options={(Object.keys(workplaceLabels) as WorkplaceType[]).map((value) => ({ value, label: workplaceLabels[value] }))}
        selected={filters.workplaces}
        onChange={(value) => update("workplaces", value)}
      />
    </div>
  );
}
