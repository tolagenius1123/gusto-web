import { GraduationCapIcon } from "lucide-react";
import type { Education } from "@/types/profile";
import { ProfileSection } from "./profile-section";

interface EducationSectionProps {
  education: Education[];
  isEditable: boolean;
}

export function EducationSection({ education, isEditable }: EducationSectionProps) {
  return (
    <ProfileSection id="education" title="Education" icon={GraduationCapIcon} isEditable={isEditable}>
      <ul className="space-y-4">
        {education.map((entry) => (
          <li key={entry.id} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted/50"
            >
              <GraduationCapIcon className="size-5 text-muted-foreground" />
            </span>
            <div>
              <h3 className="font-semibold">{entry.school}</h3>
              <p className="text-sm">
                {entry.qualification}, {entry.field}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.startYear} - {entry.endYear}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ProfileSection>
  );
}
