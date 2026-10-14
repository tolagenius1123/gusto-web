import { ArrowRightIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Enrollment } from "@/types/training";
import { CourseBanner } from "./course-banner";

export function ContinueLearningCard({ enrollment }: { enrollment: Enrollment }) {
  const { course, progress, nextLesson } = enrollment;

  return (
    <Card className="animate-rise gap-0 overflow-hidden rounded-2xl py-0 sm:flex-row">
      <CourseBanner course={course} className="h-20 sm:h-auto sm:w-40" />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <WidgetTitle icon={PlayCircleIcon} iconClassName="text-success">
            Continue learning
          </WidgetTitle>
          <p className="font-semibold">{course.title}</p>
          <p className="text-xs text-muted-foreground">Next up: {nextLesson}</p>
          <div className="flex items-center gap-3">
            <Progress
              value={progress}
              aria-label={`${course.title} progress`}
              className="flex-1 [&_[data-slot=progress-indicator]]:bg-success [&_[data-slot=progress-track]]:h-2"
            />
            <span className="text-xs font-semibold">{progress}%</span>
          </div>
        </div>
        <Link href={`/training/${course.id}`} className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
          Resume
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
