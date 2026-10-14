import { BanknoteIcon, CalendarSyncIcon, TrendingUpIcon } from "lucide-react";
import type { Job } from "@/types/job";
import { experienceLabels, formatSalary, siteTypeConfig } from "../job-options";

const chipClassName = "inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2.5 py-1 text-xs";

export function JobMetaChips({ job, showExperience = false }: { job: Job; showExperience?: boolean }) {
  const { label: siteLabel, icon: SiteIcon } = siteTypeConfig[job.siteType];

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Job details">
      <li className={chipClassName}>
        <SiteIcon aria-hidden="true" className="size-3.5 text-primary" />
        {siteLabel}
      </li>
      <li className={chipClassName}>
        <CalendarSyncIcon aria-hidden="true" className="size-3.5 text-primary" />
        {job.rotation}
      </li>
      {showExperience && (
        <li className={chipClassName}>
          <TrendingUpIcon aria-hidden="true" className="size-3.5 text-primary" />
          {experienceLabels[job.experienceLevel]}
        </li>
      )}
      {job.salary && (
        <li className={`${chipClassName} border-success/30 text-success`}>
          <BanknoteIcon aria-hidden="true" className="size-3.5" />
          {formatSalary(job.salary)}
        </li>
      )}
    </ul>
  );
}
