import {
  AtSignIcon,
  BellIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  EyeIcon,
  GraduationCapIcon,
  HeartIcon,
  MessageSquareTextIcon,
  ShieldAlertIcon,
  UserPlusIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import type { NotificationKind } from "@/types/notification";

export type NotificationCategory = "safety" | "jobs" | "training" | "posts" | "mentions" | "network";

interface KindConfig {
  icon: LucideIcon;
  badgeClassName: string;
  category: NotificationCategory;
}

export const kindConfig: Record<NotificationKind, KindConfig> = {
  safety_alert: { icon: ShieldAlertIcon, badgeClassName: "bg-hivis text-hivis-foreground", category: "safety" },
  certification: { icon: CalendarClockIcon, badgeClassName: "bg-hivis text-hivis-foreground", category: "safety" },
  job_match: { icon: BriefcaseBusinessIcon, badgeClassName: "bg-primary text-primary-foreground", category: "jobs" },
  training: { icon: GraduationCapIcon, badgeClassName: "bg-success text-success-foreground", category: "training" },
  reaction: { icon: HeartIcon, badgeClassName: "bg-rose-600 text-white", category: "posts" },
  comment: { icon: MessageSquareTextIcon, badgeClassName: "bg-primary text-primary-foreground", category: "posts" },
  mention: { icon: AtSignIcon, badgeClassName: "bg-primary text-primary-foreground", category: "mentions" },
  connection: { icon: UserPlusIcon, badgeClassName: "bg-success text-success-foreground", category: "network" },
  profile_view: { icon: EyeIcon, badgeClassName: "bg-muted-foreground text-background", category: "network" },
};

export type NotificationFilter = NotificationCategory | "all";

export const notificationFilters: { value: NotificationFilter; label: string; icon: LucideIcon }[] = [
  { value: "all", label: "All", icon: BellIcon },
  { value: "safety", label: "Safety", icon: ShieldAlertIcon },
  { value: "jobs", label: "Jobs", icon: BriefcaseBusinessIcon },
  { value: "training", label: "Training", icon: GraduationCapIcon },
  { value: "posts", label: "My posts", icon: MessageSquareTextIcon },
  { value: "mentions", label: "Mentions", icon: AtSignIcon },
  { value: "network", label: "Network", icon: UsersIcon },
];
