import {
  AnchorIcon,
  ConstructionIcon,
  FactoryIcon,
  MountainIcon,
  TreesIcon,
  type LucideIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { ExperienceLevel, SalaryRange, SiteType, WorkplaceType } from "@/types/job";

export const siteTypeConfig: Record<SiteType, { label: string; icon: LucideIcon }> = {
  onshore: { label: "Onshore", icon: TreesIcon },
  offshore: { label: "Offshore", icon: AnchorIcon },
  plant: { label: "Plant", icon: FactoryIcon },
  construction_site: { label: "Construction site", icon: ConstructionIcon },
  mine: { label: "Mine", icon: MountainIcon },
};

export const siteTypes = Object.keys(siteTypeConfig) as SiteType[];

export const workplaceLabels: Record<WorkplaceType, string> = {
  on_site: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export const experienceLabels: Record<ExperienceLevel, string> = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior",
  lead: "Lead or manager",
};

export const experienceLevels = Object.keys(experienceLabels) as ExperienceLevel[];

export function formatSalary(salary: SalaryRange) {
  const range = `${formatCurrency(salary.min, salary.currency)} to ${formatCurrency(salary.max, salary.currency)}`;
  return `${range} / ${salary.period === "month" ? "mo" : "yr"}`;
}
