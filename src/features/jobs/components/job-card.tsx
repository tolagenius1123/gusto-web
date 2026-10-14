import Link from "next/link";
import { RelativeTime } from "@/components/shared/relative-time";
import { Card } from "@/components/ui/card";
import type { CertificationMatch } from "@/lib/certifications";
import { pluralize } from "@/lib/format";
import type { Job } from "@/types/job";
import { workplaceLabels } from "../job-options";
import { CertificationMatchBadge } from "./certification-match-badge";
import { CompanyLogo } from "./company-logo";
import { JobMetaChips } from "./job-meta-chips";
import { SaveJobButton } from "./save-job-button";
import { UrgentBadge } from "./urgent-badge";

interface JobCardProps {
  job: Job;
  match: CertificationMatch;
}

export function JobCard({ job, match }: JobCardProps) {
  return (
    <Card className="group relative gap-3 rounded-2xl px-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_var(--glow)] hover:ring-primary/30">
      <div className="flex items-start gap-3">
        <CompanyLogo company={job.company} />
        <div className="min-w-0 flex-1">
          {job.isUrgent && <UrgentBadge />}
          <h3 className="font-heading text-lg leading-tight font-bold">
            <Link
              href={`/jobs/${job.id}`}
              className="outline-none group-hover:text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-sm">{job.company.name}</p>
          <p className="text-xs text-muted-foreground">
            {job.location}
            <span aria-hidden="true"> · </span>
            {workplaceLabels[job.workplace]}
          </p>
        </div>
        <SaveJobButton jobTitle={job.title} className="relative z-10 -mt-1 -mr-2" />
      </div>
      <JobMetaChips job={job} />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <CertificationMatchBadge match={match} />
        <p className="text-xs text-muted-foreground">
          <RelativeTime date={job.postedAt} />
          <span aria-hidden="true"> · </span>
          {pluralize(job.applicantCount, "applicant")}
        </p>
      </div>
    </Card>
  );
}
