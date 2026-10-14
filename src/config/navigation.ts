import {
  BellIcon,
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  HouseIcon,
  MessageSquareTextIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItemId =
  | "feed"
  | "network"
  | "jobs"
  | "training"
  | "messaging"
  | "notifications";

export interface NavItem {
  id: NavItemId;
  label: string;
  href: string;
  icon: LucideIcon;
  inMobileTabBar: boolean;
}

export const primaryNav: NavItem[] = [
  { id: "feed", label: "Home", href: "/feed", icon: HouseIcon, inMobileTabBar: true },
  { id: "network", label: "My Network", href: "/network", icon: UsersIcon, inMobileTabBar: true },
  { id: "jobs", label: "Jobs", href: "/jobs", icon: BriefcaseBusinessIcon, inMobileTabBar: true },
  { id: "training", label: "Training", href: "/training", icon: GraduationCapIcon, inMobileTabBar: true },
  { id: "messaging", label: "Messaging", href: "/messaging", icon: MessageSquareTextIcon, inMobileTabBar: false },
  { id: "notifications", label: "Notifications", href: "/notifications", icon: BellIcon, inMobileTabBar: true },
];

export function getNavItem(id: NavItemId): NavItem {
  const item = primaryNav.find((navItem) => navItem.id === id);
  if (!item) throw new Error(`Unknown nav item: ${id}`);
  return item;
}

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
