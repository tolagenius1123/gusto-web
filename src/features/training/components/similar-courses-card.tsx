import { GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/training";
import { categoryConfig } from "../course-options";

export function SimilarCoursesCard({ courses }: { courses: Course[] }) {
  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={GraduationCapIcon}>You may also like</WidgetTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {courses.map((course) => {
            const { icon: Icon, bannerClassName, iconClassName } = categoryConfig[course.category];
            return (
              <li key={course.id}>
                <Link
                  href={`/training/${course.id}`}
                  className="group -mx-2 flex gap-3 rounded-lg px-2 py-2 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span aria-hidden="true" className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br", bannerClassName)}>
                    <Icon className={cn("size-5", iconClassName)} />
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm font-semibold group-hover:text-primary">{course.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {course.accreditingBody} · {formatCurrency(course.priceNgn, "NGN")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
