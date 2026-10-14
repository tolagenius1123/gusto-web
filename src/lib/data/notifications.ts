import { mockNotifications } from "@/mocks/notifications";
import type { AppNotification } from "@/types/notification";

export async function getNotifications(): Promise<AppNotification[]> {
  return mockNotifications.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}
