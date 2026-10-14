"use client";

import { useNow } from "@/hooks/use-now";
import { formatDuration, formatMonthYear, getMonthsBetween } from "@/lib/format";

interface DateRangeProps {
  start: string;
  end: string | null;
  className?: string;
}

export function DateRange({ start, end, className }: DateRangeProps) {
  const now = useNow();
  const durationEnd = end ?? now;

  return (
    <p className={className}>
      <time dateTime={start}>{formatMonthYear(start)}</time>
      {" - "}
      {end ? <time dateTime={end}>{formatMonthYear(end)}</time> : "Present"}
      {durationEnd !== null && (
        <>
          <span aria-hidden="true"> · </span>
          {formatDuration(getMonthsBetween(start, durationEnd))}
        </>
      )}
    </p>
  );
}
