import { AwardIcon, ClockIcon, HardHatIcon, ShieldCheckIcon, type LucideIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { cn } from "@/lib/utils";
import type { SafetyHighlights as SafetyHighlightsData } from "@/types/profile";

interface HighlightTile {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
}

interface SafetyHighlightsProps {
  highlights: SafetyHighlightsData;
  certificationCount: number;
}

export function SafetyHighlights({ highlights, certificationCount }: SafetyHighlightsProps) {
  const tiles: HighlightTile[] = [
    { label: "Years in HSE", value: highlights.yearsInHse, icon: HardHatIcon, iconClassName: "text-caution" },
    { label: "Certifications", value: certificationCount, icon: ShieldCheckIcon, iconClassName: "text-success" },
    { label: "Safe man-hours", value: highlights.safeManHours, icon: ClockIcon, iconClassName: "text-primary" },
    { label: "Incident-free projects", value: highlights.incidentFreeProjects, icon: AwardIcon, iconClassName: "text-caution" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {tiles.map(({ label, value, icon: Icon, iconClassName }) => (
        <div
          key={label}
          className="group flex items-center gap-3 rounded-xl border bg-muted/40 p-3 transition-colors hover:border-primary/30"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/60">
            <Icon aria-hidden="true" className={cn("size-4.5 transition-transform group-hover:scale-110", iconClassName)} />
          </span>
          <div className="min-w-0">
            <dd className="font-heading text-xl leading-none font-bold">
              <AnimatedNumber value={value} />
            </dd>
            <dt className="mt-1 truncate text-[11px] text-muted-foreground">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
