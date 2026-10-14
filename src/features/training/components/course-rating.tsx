import { StarIcon } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";

export function CourseRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs">
      <StarIcon aria-hidden="true" className="size-3.5 fill-hivis text-hivis" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">
        ({formatCompactNumber(reviewCount)}
        <span className="sr-only"> reviews</span>)
      </span>
    </span>
  );
}
