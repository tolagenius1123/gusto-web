import { cn } from "@/lib/utils";
import type { PresenceStatus } from "@/types/messaging";

const presenceClasses: Record<PresenceStatus, string> = {
  online: "bg-success",
  away: "bg-hivis",
  offline: "bg-muted-foreground/60",
};

export const presenceLabels: Record<PresenceStatus, string> = {
  online: "Online",
  away: "Away",
  offline: "Offline",
};

export function PresenceDot({ status, className }: { status: PresenceStatus; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute right-0 bottom-0 size-3 rounded-full ring-2 ring-card", presenceClasses[status], className)}
    />
  );
}
