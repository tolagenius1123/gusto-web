import { BriefcaseBusinessIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Job } from "@/types/job";
import { siteTypeConfig } from "../job-options";
import { CompanyLogo } from "./company-logo";

export function SimilarJobsCard({ jobs }: { jobs: Job[] }) {
  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={BriefcaseBusinessIcon}>Similar jobs</WidgetTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.id}`}
                className="group -mx-2 flex gap-3 rounded-lg px-2 py-2 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <CompanyLogo company={job.company} className="size-10 text-base" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold group-hover:text-primary">{job.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{job.company.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {siteTypeConfig[job.siteType].label} · {job.rotation}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
