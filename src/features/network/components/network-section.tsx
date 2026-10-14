import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function NetworkSection({
  id,
  title,
  description,
  icon: Icon,
  iconClassName,
  action,
  children,
}: NetworkSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon aria-hidden="true" className={cn("size-5 text-primary", iconClassName)} />
          </span>
          <div>
            <h2 id={headingId} className="font-heading text-xl font-bold tracking-wide uppercase">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
