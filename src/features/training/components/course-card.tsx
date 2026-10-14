import { AwardIcon, CalendarDaysIcon, ClockIcon, MonitorPlayIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatShortDate, pluralize } from "@/lib/format";
import type { Course } from "@/types/training";
import { deliveryLabels } from "../course-options";
import { CertificationDemand } from "./certification-demand";
import { CourseBanner } from "./course-banner";
import { CourseRating } from "./course-rating";

interface CourseCardProps {
  course: Course;
  jobDemand: number;
}

export function CourseCard({ course, jobDemand }: CourseCardProps) {
  const nextCohort = course.cohorts[0];

  return (
    <Card className="group relative h-full gap-0 rounded-2xl py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_var(--glow)] hover:ring-primary/30">
      <CourseBanner course={course} className="h-24" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg leading-tight font-bold">
            <Link
              href={`/training/${course.id}`}
              className="outline-none group-hover:text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {course.title}
            </Link>
          </h3>
          <CourseRating rating={course.rating} reviewCount={course.reviewCount} />
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground" aria-label="Course details">
          <li className="inline-flex items-center gap-1">
            <MonitorPlayIcon aria-hidden="true" className="size-3.5" />
            {deliveryLabels[course.delivery]}
          </li>
          <li className="inline-flex items-center gap-1">
            <ClockIcon aria-hidden="true" className="size-3.5" />
            {pluralize(course.durationDays, "day")}
          </li>
          {nextCohort && (
            <li className="inline-flex items-center gap-1">
              <CalendarDaysIcon aria-hidden="true" className="size-3.5" />
              Starts {formatShortDate(nextCohort.startDate)}
            </li>
          )}
        </ul>
        {course.certificationShortName && (
          <div className="space-y-1">
            <p className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              <AwardIcon aria-hidden="true" className="size-3.5" />
              Earns {course.certificationShortName}
            </p>
            <div>
              <CertificationDemand count={jobDemand} />
            </div>
          </div>
        )}
        <p className="mt-auto border-t pt-3 font-heading text-xl font-bold">
          {formatCurrency(course.priceNgn, "NGN")}
        </p>
      </div>
    </Card>
  );
}
