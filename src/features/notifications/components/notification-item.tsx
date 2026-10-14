"use client";

import { BellOffIcon, CheckIcon, EllipsisIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { RelativeTime } from "@/components/shared/relative-time";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFullName } from "@/lib/format";
import { notifyComingSoon } from "@/lib/notify";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types/notification";
import { NotificationIcon } from "./notification-icon";

interface NotificationItemProps {
  notification: AppNotification;
  isRead: boolean;
  onOpen: () => void;
  onToggleRead: () => void;
}

export function NotificationItem({ notification, isRead, onOpen, onToggleRead }: NotificationItemProps) {
  const actorName = notification.actor ? getFullName(notification.actor) : null;

  return (
    <article
      className={cn(
        "group relative flex gap-3 p-4 transition-colors hover:bg-muted/40",
        !isRead && "bg-primary/[0.06] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary",
      )}
    >
      <NotificationIcon notification={notification} />
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-sm leading-snug">
          {!isRead && <span className="sr-only">Unread: </span>}
          <Link
            href={notification.href}
            onClick={onOpen}
            className="outline-none after:absolute after:inset-0 focus-visible:after:ring-3 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
          >
            {actorName && <strong className="font-semibold">{actorName} </strong>}
            {notification.message}
          </Link>
        </p>
        {notification.preview && (
          <p className="line-clamp-2 rounded-lg border-l-2 border-primary/40 bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
            {notification.preview}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <RelativeTime date={notification.createdAt} className="text-xs text-muted-foreground" />
          {notification.action && (
            <Link
              href={notification.action.href}
              onClick={onOpen}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "relative z-10 rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary",
              )}
            >
              {notification.action.label}
            </Link>
          )}
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" className="rounded-full" />}
            aria-label="Notification options"
          >
            <EllipsisIcon aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuItem onClick={onToggleRead}>
              {isRead ? <MailIcon aria-hidden="true" /> : <CheckIcon aria-hidden="true" />}
              {isRead ? "Mark as unread" : "Mark as read"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => notifyComingSoon("Notification preferences")}>
              <BellOffIcon aria-hidden="true" />
              Turn off notifications like this
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {!isRead && <span aria-hidden="true" className="size-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />}
      </div>
    </article>
  );
}
