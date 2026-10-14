import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SectionEditButton } from "./section-edit-button";

interface ProfileSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconClassName?: string;
  isEditable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ProfileSection({
  id,
  title,
  icon: Icon,
  iconClassName,
  isEditable = false,
  className,
  children,
}: ProfileSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-36">
      <Card className={cn("gap-4 rounded-2xl", className)}>
        <header className="flex items-center justify-between gap-2 px-(--card-spacing)">
          <h2 id={headingId} className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-wide uppercase">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon aria-hidden="true" className={cn("size-4.5 text-primary", iconClassName)} />
            </span>
            {title}
          </h2>
          {isEditable && <SectionEditButton sectionTitle={title} />}
        </header>
        <div className="px-(--card-spacing)">{children}</div>
      </Card>
    </section>
  );
}
