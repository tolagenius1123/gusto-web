import type { ExperienceLevel } from "@/types/job";

export const experienceLabels: Record<ExperienceLevel, string> = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior",
  lead: "Lead or manager",
};

export const experienceLevels = Object.keys(experienceLabels) as ExperienceLevel[];
