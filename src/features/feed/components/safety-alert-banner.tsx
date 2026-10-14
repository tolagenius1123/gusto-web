import { TriangleAlertIcon } from "lucide-react";
import { HazardTape } from "@/components/layout/hazard-tape";

export function SafetyAlertBanner() {
  return (
    <div className="-mt-(--card-spacing)">
      <HazardTape animated className="h-1.5" />
      <p className="flex items-center gap-2 bg-hivis/10 px-(--card-spacing) py-2 font-heading text-xs font-bold tracking-[0.15em] text-caution uppercase">
        <span aria-hidden="true" className="relative flex size-5 items-center justify-center rounded-full bg-hivis text-hivis-foreground animate-beacon">
          <TriangleAlertIcon className="size-3" strokeWidth={2.5} />
        </span>
        Safety alert
      </p>
    </div>
  );
}
