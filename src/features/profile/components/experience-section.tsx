import { BriefcaseBusinessIcon, MapPinIcon } from "lucide-react";
import { DateRange } from "@/components/shared/date-range";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/profile";
import { ProfileSection } from "./profile-section";

interface ExperienceSectionProps {
  experience: Experience[];
  isEditable: boolean;
}

export function ExperienceSection({ experience, isEditable }: ExperienceSectionProps) {
  return (
    <ProfileSection id="experience" title="Experience" icon={BriefcaseBusinessIcon} isEditable={isEditable}>
      <ol className="relative space-y-6 border-l border-dashed border-border pl-6">
        {experience.map((role) => {
          const isCurrent = role.endDate === null;
          return (
            <li key={role.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1.5 -left-[31px] size-3.5 rounded-full border-2 border-card",
                  isCurrent ? "bg-hivis animate-beacon" : "bg-muted-foreground/60",
                )}
              />
              <div className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted/50 font-heading text-lg font-bold text-primary"
                >
                  {role.company.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{role.title}</h3>
                  <p className="text-sm">
                    {role.company}
                    <span aria-hidden="true"> · </span>
                    {role.employmentType}
                  </p>
                  <DateRange start={role.startDate} end={role.endDate} className="text-xs text-muted-foreground" />
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPinIcon aria-hidden="true" className="size-3" />
                    {role.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{role.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </ProfileSection>
  );
}
