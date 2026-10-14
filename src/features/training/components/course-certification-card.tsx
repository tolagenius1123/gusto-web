import { ArrowRightIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Course } from "@/types/training";
import { CertificationDemand } from "./certification-demand";

export function CourseCertificationCard({ course, jobDemand }: { course: Course; jobDemand: number }) {
  return (
    <Card size="sm" className="rounded-2xl border-l-4 border-l-success">
      <CardHeader>
        <WidgetTitle icon={AwardIcon} iconClassName="text-success">
          Certification
        </WidgetTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {course.certificationShortName ? (
          <>
            <p className="font-heading text-xl font-bold">{course.certificationShortName}</p>
            <p className="text-xs text-muted-foreground">Awarded by {course.accreditingBody} on successful completion.</p>
            <CertificationDemand count={jobDemand} />
            {jobDemand > 0 && (
              <Link
                href="/jobs"
                className="group flex items-center gap-1 rounded-sm text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                View matching jobs
                <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Certificate of completion from {course.accreditingBody}. Counts toward your CPD hours.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
