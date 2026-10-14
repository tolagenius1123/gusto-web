import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ReactionType } from "@/types/post";
import { getTopReactions, getTotalReactions, reactionConfig } from "../reactions";

export function ReactionSummary({ counts }: { counts: Partial<Record<ReactionType, number>> }) {
  const total = getTotalReactions(counts);
  if (total === 0) return null;

  return (
    <span className="flex items-center gap-1.5">
      <span className="flex -space-x-1" aria-hidden="true">
        {getTopReactions(counts).map((type) => {
          const { icon: Icon, badgeClassName } = reactionConfig[type];
          return (
            <span
              key={type}
              className={cn("flex size-4.5 items-center justify-center rounded-full ring-2 ring-card", badgeClassName)}
            >
              <Icon className="size-2.5" strokeWidth={2.5} />
            </span>
          );
        })}
      </span>
      <span>
        {formatCompactNumber(total)}
        <span className="sr-only"> reactions</span>
      </span>
    </span>
  );
}
