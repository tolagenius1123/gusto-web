import type { Metadata } from "next";
import { NotificationsCenter } from "@/features/notifications/components/notifications-center";
import { getNotifications } from "@/lib/data/notifications";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  return <NotificationsCenter notifications={notifications} />;
}
