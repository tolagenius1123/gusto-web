import type { UserSummary } from "./user";

export type NotificationKind =
  | "safety_alert"
  | "certification"
  | "job_match"
  | "training"
  | "reaction"
  | "comment"
  | "mention"
  | "connection"
  | "profile_view";

export interface NotificationAction {
  label: string;
  href: string;
}

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  actor: UserSummary | null;
  message: string;
  preview: string | null;
  href: string;
  createdAt: string;
  isRead: boolean;
  isCritical: boolean;
  action: NotificationAction | null;
}
