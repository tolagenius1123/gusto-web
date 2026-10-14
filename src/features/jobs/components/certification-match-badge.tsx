import { CircleCheckIcon, CircleDashedIcon, ShieldIcon } from "lucide-react";
import type { CertificationMatch } from "@/lib/certifications";
import { cn } from "@/lib/utils";

export function CertificationMatchBadge({ match, className }: { match: CertificationMatch; className?: string }) {
  const total = match.held.length + match.missing.length;

  if (total === 0) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
        <ShieldIcon aria-hidden="true" className="size-3.5" />
        No certifications required
      </span>
    );
  }

  if (match.isQualified) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-success", className)}>
        <CircleCheckIcon aria-hidden="true" className="size-3.5" />
        You hold all {total} required certifications
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-caution", className)}>
      <CircleDashedIcon aria-hidden="true" className="size-3.5" />
      You hold {match.held.length} of {total} required certifications
    </span>
  );
}
