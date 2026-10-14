import { ArrowRightIcon, GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TrainingRecommendation {
  id: string;
  title: string;
  provider: string;
  duration: string;
  reason: string;
}

export function RecommendedTrainingCard({ courses }: { courses: TrainingRecommendation[] }) {
  return (
    <Card size="sm" className="rounded-2xl border-l-4 border-l-hivis">
      <CardHeader>
        <WidgetTitle icon={GraduationCapIcon} iconClassName="text-caution">
          Recommended training
        </WidgetTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href="/training"
                className="group -mx-2 block rounded-lg px-2 py-2 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-[11px] font-medium text-caution">{course.reason}</span>
                <span className="flex items-center justify-between gap-2 text-sm font-semibold group-hover:text-primary">
                  {course.title}
                  <ArrowRightIcon aria-hidden="true" className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-xs text-muted-foreground">
                  {course.provider} · {course.duration}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
