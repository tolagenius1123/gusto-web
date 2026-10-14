import { CheckIcon, type LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";

interface JobListSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
}

export function JobListSection({ id, title, icon, items }: JobListSectionProps) {
  if (items.length === 0) return null;

  return (
    <SectionCard id={id} title={title} icon={icon}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
            <CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
            {item}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
