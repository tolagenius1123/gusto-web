import {
  AnchorIcon,
  ConstructionIcon,
  FactoryIcon,
  MountainIcon,
  TreesIcon,
  type LucideIcon,
} from "lucide-react";
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

const currencyFormatters = {
  NGN: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", notation: "compact", maximumFractionDigits: 1 }),
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }),
};

export function formatSalary(salary: SalaryRange) {
  const formatter = currencyFormatters[salary.currency];
  return `${formatter.format(salary.min)} to ${formatter.format(salary.max)} / ${salary.period === "month" ? "mo" : "yr"}`;
}
