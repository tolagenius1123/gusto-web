"use client";

import { useNow } from "@/hooks/use-now";
import { formatMonthYear } from "@/lib/format";
import { cn } from "@/lib/utils";

const EXPIRING_SOON_DAYS = 60;
const DAY_MS = 86_400_000;

export type ExpiryStatus = "none" | "valid" | "expiring" | "expired" | "unknown";

export function getExpiryStatus(expiresAt: string | null, now: number | null): ExpiryStatus {
  if (!expiresAt) return "none";
  if (now === null) return "unknown";
  const daysLeft = (new Date(expiresAt).getTime() - now) / DAY_MS;
  if (daysLeft < 0) return "expired";
  return daysLeft <= EXPIRING_SOON_DAYS ? "expiring" : "valid";
}

const statusStyles: Record<ExpiryStatus, { text: string; dot: string }> = {
  none: { text: "text-muted-foreground", dot: "bg-success" },
  unknown: { text: "text-muted-foreground", dot: "bg-muted-foreground" },
  valid: { text: "text-success", dot: "bg-success" },
  expiring: { text: "text-caution", dot: "bg-hivis animate-beacon" },
  expired: { text: "text-destructive", dot: "bg-destructive" },
};

function getLabel(status: ExpiryStatus, expiresAt: string | null) {
  if (!expiresAt || status === "none") return "No expiry";
  const monthYear = formatMonthYear(expiresAt);
  return {
    unknown: `Expires ${monthYear}`,
    valid: `Valid until ${monthYear}`,
    expiring: `Expires soon, ${monthYear}`,
    expired: `Expired ${monthYear}`,
  }[status];
}

export function CertificationExpiry({ expiresAt, className }: { expiresAt: string | null; className?: string }) {
  const status = getExpiryStatus(expiresAt, useNow());
  const styles = statusStyles[status];

  return (
    <p className={cn("flex items-center gap-1.5", styles.text, className)}>
      <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} />
      {getLabel(status, expiresAt)}
    </p>
  );
}
