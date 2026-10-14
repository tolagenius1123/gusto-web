export function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getFullName(user: { firstName: string; lastName: string }) {
  return `${user.firstName} ${user.lastName}`;
}

export function formatBadgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${formatCompactNumber(count)} ${count === 1 ? singular : plural}`;
}

const shortDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthYearFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const fullDateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function formatShortDate(date: string) {
  return shortDateFormatter.format(new Date(date));
}

export function formatMonthYear(date: string) {
  return monthYearFormatter.format(new Date(date));
}

export function formatFullDate(date: string) {
  return `${fullDateFormatter.format(new Date(date))} UTC`;
}

const RELATIVE_UNITS = [
  { unit: "w", seconds: 604_800 },
  { unit: "d", seconds: 86_400 },
  { unit: "h", seconds: 3_600 },
  { unit: "m", seconds: 60 },
] as const;

const MAX_RELATIVE_WEEKS = 4;

export function formatRelativeShort(date: string, now: number) {
  const elapsedSeconds = Math.max(0, (now - new Date(date).getTime()) / 1000);
  if (elapsedSeconds >= RELATIVE_UNITS[0].seconds * MAX_RELATIVE_WEEKS) {
    return formatShortDate(date);
  }
  const match = RELATIVE_UNITS.find(({ seconds }) => elapsedSeconds >= seconds);
  return match ? `${Math.floor(elapsedSeconds / match.seconds)}${match.unit}` : "now";
}
