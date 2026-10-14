import { BriefcaseBusinessIcon } from "lucide-react";
import { pluralize } from "@/lib/format";

export function CertificationDemand({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-caution">
      <BriefcaseBusinessIcon aria-hidden="true" className="size-3.5" />
      Required by {pluralize(count, "open job")}
    </span>
  );
}
