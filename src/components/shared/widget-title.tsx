import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetTitleProps {
  icon?: LucideIcon;
  iconClassName?: string;
  id?: string;
  children: React.ReactNode;
}

export function WidgetTitle({ icon: Icon, iconClassName, id, children }: WidgetTitleProps) {
  return (
    <h2 id={id} className="flex items-center gap-2 font-heading text-sm font-semibold tracking-wider uppercase">
      {Icon && <Icon aria-hidden="true" className={cn("size-4 text-primary", iconClassName)} />}
      {children}
    </h2>
  );
}
