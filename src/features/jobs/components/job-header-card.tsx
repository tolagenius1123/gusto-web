import { MapPinIcon, UsersRoundIcon } from "lucide-react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { RelativeTime } from "@/components/shared/relative-time";
import { Card } from "@/components/ui/card";
import { pluralize } from "@/lib/format";
import type { Job } from "@/types/job";
import { workplaceLabels } from "../job-options";
import { ApplyButton } from "./apply-button";
import { CompanyLogo } from "./company-logo";
import { JobMetaChips } from "./job-meta-chips";
import { SaveJobButton } from "./save-job-button";
import { UrgentBadge } from "./urgent-badge";

export function JobHeaderCard({ job, applicantEmail }: { job: Job; applicantEmail: string }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl py-0">
      {job.isUrgent && <HazardTape animated className="h-1.5" />}
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <CompanyLogo company={job.company} size="lg" />
          <div className="min-w-0 space-y-1">
            {job.isUrgent && <UrgentBadge />}
            <h1 className="font-heading text-2xl leading-tight font-bold tracking-wide sm:text-3xl">{job.title}</h1>
            <p className="font-medium">{job.company.name}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon aria-hidden="true" className="size-3.5" />
                {job.location} ({workplaceLabels[job.workplace]})
              </span>
              <span>
                Posted <RelativeTime date={job.postedAt} />
              </span>
              <span className="inline-flex items-center gap-1">
                <UsersRoundIcon aria-hidden="true" className="size-3.5" />
                {pluralize(job.applicantCount, "applicant")}
              </span>
            </p>
          </div>
        </div>
        <JobMetaChips job={job} showExperience />
        <div className="flex flex-wrap gap-2">
          <ApplyButton jobTitle={job.title} companyName={job.company.name} defaultEmail={applicantEmail} />
          <SaveJobButton jobTitle={job.title} variant="full" />
        </div>
      </div>
    </Card>
  );
}
