import { WrenchIcon } from "lucide-react";
import type { SkillGroup } from "@/types/profile";
import { ProfileSection } from "./profile-section";

interface SkillsSectionProps {
  skills: SkillGroup[];
  isEditable: boolean;
}

export function SkillsSection({ skills, isEditable }: SkillsSectionProps) {
  return (
    <ProfileSection id="skills" title="Skills" icon={WrenchIcon} iconClassName="text-caution" isEditable={isEditable}>
      <div className="space-y-5">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{group.category}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border bg-muted/40 py-1 pr-1 pl-3 text-sm transition-colors hover:border-primary/40"
                >
                  {skill.name}
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {skill.endorsements}
                    <span className="sr-only"> endorsements</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
}
