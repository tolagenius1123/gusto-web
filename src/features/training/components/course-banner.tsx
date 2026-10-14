import { cn } from "@/lib/utils";
import type { Course } from "@/types/training";
import { categoryConfig } from "../course-options";

interface CourseBannerProps {
  course: Course;
  className?: string;
}

export function CourseBanner({ course, className }: CourseBannerProps) {
  const { icon: Icon, bannerClassName, iconClassName } = categoryConfig[course.category];

  return (
    <div className={cn("relative overflow-hidden bg-linear-to-br", bannerClassName, className)}>
      <span className="absolute top-3 left-3 rounded-full bg-background/75 px-2.5 py-0.5 text-[11px] font-bold tracking-wide backdrop-blur">
        {course.accreditingBody}
      </span>
      {course.isPopular && (
        <span className="absolute top-3 right-3 rounded-full bg-hivis px-2.5 py-0.5 text-[11px] font-bold text-hivis-foreground">
          Popular
        </span>
      )}
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className={cn(
          "absolute -right-3 -bottom-4 size-24 opacity-30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
          iconClassName,
        )}
      />
    </div>
  );
}
