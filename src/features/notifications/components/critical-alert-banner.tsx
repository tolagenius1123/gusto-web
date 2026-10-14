"use client";

import { ShieldAlertIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { HazardTape } from "@/components/layout/hazard-tape";
import { RelativeTime } from "@/components/shared/relative-time";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types/notification";

interface CriticalAlertBannerProps {
  notification: AppNotification;
  onDismiss: () => void;
  onOpen: () => void;
}

export function CriticalAlertBanner({ notification, onDismiss, onOpen }: CriticalAlertBannerProps) {
  return (
    <Card role="alert" className="animate-rise gap-0 overflow-hidden rounded-2xl py-0 ring-hivis/50">
      <HazardTape animated className="h-2" />
      <div className="flex gap-4 bg-hivis/[0.07] p-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-hivis text-hivis-foreground animate-beacon">
          <ShieldAlertIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-heading text-sm font-bold tracking-[0.15em] text-caution uppercase">Critical safety alert</p>
          <p className="text-sm">
            {notification.actor && <strong>{getFullName(notification.actor)} </strong>}
            {notification.message}
          </p>
          {notification.preview && <p className="text-sm font-medium">{notification.preview}</p>}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {notification.action && (
              <Link
                href={notification.action.href}
                onClick={onOpen}
                className={cn(buttonVariants({ size: "sm" }), "rounded-full bg-hivis px-4 text-hivis-foreground hover:bg-hivis/90")}
              >
                {notification.action.label}
              </Link>
            )}
            <RelativeTime date={notification.createdAt} className="text-xs text-muted-foreground" />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 rounded-full"
          aria-label="Dismiss critical alert"
          onClick={onDismiss}
        >
          <XIcon aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
}
