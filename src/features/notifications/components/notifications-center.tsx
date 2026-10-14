"use client";

import { CheckCheckIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FilterChip, FilterChipGroup } from "@/components/shared/filter-chip";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIdSet } from "@/hooks/use-id-set";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types/notification";
import { kindConfig, notificationFilters, type NotificationFilter } from "../notification-options";
import { CriticalAlertBanner } from "./critical-alert-banner";
import { NotificationItem } from "./notification-item";

function matchesFilter(notification: AppNotification, filter: NotificationFilter) {
  return filter === "all" || kindConfig[notification.kind].category === filter;
}

export function NotificationsCenter({ notifications }: { notifications: AppNotification[] }) {
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const read = useIdSet(notifications.filter((notification) => notification.isRead).map((notification) => notification.id));
  const dismissed = useIdSet();

  const criticalAlert = notifications.find(
    (notification) => notification.isCritical && !dismissed.has(notification.id) && matchesFilter(notification, filter),
  );
  const listed = notifications.filter((notification) => !notification.isCritical && matchesFilter(notification, filter));
  const groups = [
    { id: "new", title: "New", items: listed.filter((notification) => !notification.isRead) },
    { id: "earlier", title: "Earlier", items: listed.filter((notification) => notification.isRead) },
  ].filter((group) => group.items.length > 0);

  const unreadIds = notifications.filter((notification) => !read.has(notification.id)).map((notification) => notification.id);
  const unreadCountFor = (value: NotificationFilter) =>
    notifications.filter((notification) => !read.has(notification.id) && matchesFilter(notification, value)).length;

  function markAllAsRead() {
    read.addMany(unreadIds);
    toast.success("All notifications marked as read");
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside aria-label="Notification filters" className="hidden animate-rise space-y-4 md:sticky md:top-24 md:block">
        <Card size="sm" className="rounded-2xl">
          <CardHeader>
            <WidgetTitle>Show</WidgetTitle>
          </CardHeader>
          <CardContent>
            <ul className="-mx-2 space-y-0.5">
              {notificationFilters.map(({ value, label, icon: Icon }) => {
                const isSelected = filter === value;
                const unread = unreadCountFor(value);
                return (
                  <li key={value}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setFilter(value)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        isSelected ? "bg-primary/15 font-semibold text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      <span className="flex-1 text-left">{label}</span>
                      {unread > 0 && (
                        <span className="rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                          {unread}
                          <span className="sr-only"> unread</span>
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        <Link
          href="/settings/notifications"
          className="flex items-center gap-2 rounded-lg px-2 text-sm text-muted-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <SettingsIcon aria-hidden="true" className="size-4" />
          Notification settings
        </Link>
      </aside>

      <section aria-labelledby="notifications-heading" className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 id="notifications-heading" className="font-heading text-2xl font-bold tracking-wide uppercase">
            Notifications
          </h1>
          <Button variant="outline" className="rounded-full" disabled={unreadIds.length === 0} onClick={markAllAsRead}>
            <CheckCheckIcon aria-hidden="true" />
            Mark all as read
          </Button>
        </div>

        <div className="md:hidden">
          <FilterChipGroup label="Filter notifications">
            {notificationFilters.map(({ value, label, icon }) => (
              <FilterChip key={value} label={label} icon={icon} isSelected={filter === value} onSelect={() => setFilter(value)} />
            ))}
          </FilterChipGroup>
        </div>

        {criticalAlert && (
          <CriticalAlertBanner
            notification={criticalAlert}
            onOpen={() => read.add(criticalAlert.id)}
            onDismiss={() => {
              dismissed.add(criticalAlert.id);
              read.add(criticalAlert.id);
            }}
          />
        )}

        {groups.length === 0 ? (
          <Card className="rounded-2xl p-10 text-center">
            <p className="font-heading text-lg font-bold uppercase">All clear</p>
            <p className="text-sm text-muted-foreground">Nothing here yet. Stay safe out there.</p>
          </Card>
        ) : (
          <Card className="animate-rise gap-0 overflow-hidden rounded-2xl py-0" style={{ animationDelay: "70ms" }}>
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`notifications-${group.id}`}>
                <h2
                  id={`notifications-${group.id}`}
                  className="border-b bg-muted/30 px-4 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  {group.title}
                </h2>
                <ul className="divide-y">
                  {group.items.map((notification) => (
                    <li key={notification.id}>
                      <NotificationItem
                        notification={notification}
                        isRead={read.has(notification.id)}
                        onOpen={() => read.add(notification.id)}
                        onToggleRead={() => read.toggle(notification.id)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </Card>
        )}
      </section>
    </div>
  );
}
