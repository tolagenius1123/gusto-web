import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types/notification";
import { kindConfig } from "../notification-options";

export function NotificationIcon({ notification }: { notification: AppNotification }) {
  const { icon: Icon, badgeClassName } = kindConfig[notification.kind];

  if (!notification.actor) {
    return (
      <span aria-hidden="true" className={cn("flex size-12 shrink-0 items-center justify-center rounded-full", badgeClassName)}>
        <Icon className="size-5.5" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative size-12 shrink-0">
      <UserAvatar user={notification.actor} className="size-12" />
      <span
        className={cn(
          "absolute -right-0.5 -bottom-0.5 flex size-5.5 items-center justify-center rounded-full ring-2 ring-card",
          badgeClassName,
        )}
      >
        <Icon className="size-3" strokeWidth={2.5} />
      </span>
    </span>
  );
}
