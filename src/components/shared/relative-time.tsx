"use client";

import { useNow } from "@/hooks/use-now";
import { formatFullDate, formatRelativeShort, formatShortDate } from "@/lib/format";

interface RelativeTimeProps {
  date: string;
  className?: string;
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  const now = useNow();

  return (
    <time dateTime={date} title={formatFullDate(date)} className={className}>
      {now === null ? formatShortDate(date) : formatRelativeShort(date, now)}
    </time>
  );
}
