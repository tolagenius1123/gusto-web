import { ListOrderedIcon } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { pluralize } from "@/lib/format";
import type { CourseModule } from "@/types/training";

export function CurriculumSection({ modules }: { modules: CourseModule[] }) {
  const totalHours = modules.reduce((total, module) => total + module.hours, 0);

  return (
    <SectionCard
      id="curriculum"
      title="Curriculum"
      icon={ListOrderedIcon}
      action={<span className="text-xs text-muted-foreground">{pluralize(totalHours, "hour")} total</span>}
    >
      <ol className="space-y-2">
        {modules.map((module, index) => (
          <li
            key={module.title}
            className="flex items-center gap-3 rounded-xl border bg-muted/30 px-3 py-2.5 transition-colors hover:border-primary/30"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 font-heading font-bold text-primary">
              {index + 1}
            </span>
            <span className="flex-1 text-sm font-medium">{module.title}</span>
            <span className="text-xs text-muted-foreground">{module.hours}h</span>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
