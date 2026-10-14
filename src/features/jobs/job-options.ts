import { formatCurrency } from "@/lib/format";
import type { SalaryRange, WorkplaceType } from "@/types/job";

export { experienceLabels, experienceLevels } from "@/config/experience-levels";
export { siteTypeConfig, siteTypes } from "@/config/site-types";

export const workplaceLabels: Record<WorkplaceType, string> = {
  on_site: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export function formatSalary(salary: SalaryRange) {
  const range = `${formatCurrency(salary.min, salary.currency)} to ${formatCurrency(salary.max, salary.currency)}`;
  return `${range} / ${salary.period === "month" ? "mo" : "yr"}`;
}
