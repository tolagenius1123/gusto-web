import { ClockIcon, MonitorPlayIcon, UsersRoundIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatCompactNumber, formatCurrency, pluralize } from "@/lib/format";
import type { Course } from "@/types/training";
import { categoryConfig, deliveryLabels } from "../course-options";
import { CourseBanner } from "./course-banner";
import { CourseRating } from "./course-rating";
import { EnrollButton } from "./enroll-button";

export function CourseHeaderCard({ course }: { course: Course }) {
  const category = categoryConfig[course.category];

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl py-0">
      <CourseBanner course={course} className="h-28 sm:h-36" />
      <div className="space-y-4 p-5 sm:p-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-wider text-caution uppercase">{category.label}</p>
          <h1 className="font-heading text-2xl leading-tight font-bold tracking-wide sm:text-3xl">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <CourseRating rating={course.rating} reviewCount={course.reviewCount} />
            <span className="inline-flex items-center gap-1">
              <UsersRoundIcon aria-hidden="true" className="size-3.5" />
              {formatCompactNumber(course.enrolledCount)} trained
            </span>
            <span className="inline-flex items-center gap-1">
              <MonitorPlayIcon aria-hidden="true" className="size-3.5" />
              {deliveryLabels[course.delivery]}
            </span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon aria-hidden="true" className="size-3.5" />
              {pluralize(course.durationDays, "day")}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{course.summary}</p>
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-heading text-3xl font-bold">{formatCurrency(course.priceNgn, "NGN")}</p>
          <EnrollButton courseTitle={course.title} cohorts={course.cohorts} />
        </div>
      </div>
    </Card>
  );
}
