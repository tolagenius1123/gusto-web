"use client";

import { SearchIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RelativeTime } from "@/components/shared/relative-time";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notifyComingSoon } from "@/lib/notify";
import { cn } from "@/lib/utils";
import { currentUser } from "@/mocks/current-user";
import type { Conversation } from "@/types/messaging";
import { getConversationHref, getConversationName, getMessagePreview } from "../conversation-utils";
import { ConversationAvatar } from "./conversation-avatar";

type ListFilter = "all" | "unread" | "groups";

const filterOptions: { value: ListFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "groups", label: "Groups" },
];

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  className?: string;
}

export function ConversationList({ conversations, activeId, className }: ConversationListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ListFilter>("all");

  const normalizedQuery = query.trim().toLowerCase();
  const visible = conversations.filter(
    (conversation) =>
      (filter === "all" ||
        (filter === "unread" && conversation.unreadCount > 0) ||
        (filter === "groups" && conversation.kind === "group")) &&
      getConversationName(conversation).toLowerCase().includes(normalizedQuery),
  );

  return (
    <section aria-labelledby="conversations-heading" className={cn("flex min-h-0 flex-col", className)}>
      <header className="space-y-3 border-b p-4">
        <div className="flex items-center justify-between">
          <h1 id="conversations-heading" className="font-heading text-xl font-bold tracking-wide uppercase">
            Messaging
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="New message"
            onClick={() => notifyComingSoon("Starting new conversations")}
          >
            <SquarePenIcon aria-hidden="true" />
          </Button>
        </div>
        <div className="relative">
          <label htmlFor="conversation-search" className="sr-only">
            Search messages
          </label>
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="conversation-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search messages"
            className="h-9 rounded-full bg-muted/60 pl-9"
          />
        </div>
        <SegmentedControl label="Filter conversations" options={filterOptions} value={filter} onChange={setFilter} />
      </header>

      {visible.length === 0 ? (
        <p className="p-6 text-center text-sm text-muted-foreground">No conversations found.</p>
      ) : (
        <ul className="min-h-0 flex-1 overflow-y-auto p-2">
          {visible.map((conversation) => {
            const lastMessage = conversation.messages.at(-1);
            const isActive = conversation.id === activeId;
            const isUnread = conversation.unreadCount > 0;
            const name = getConversationName(conversation);
            return (
              <li key={conversation.id}>
                <Link
                  href={getConversationHref(conversation)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex gap-3 rounded-xl p-3 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50",
                    isActive && "bg-primary/10 ring-1 ring-primary/30 hover:bg-primary/10",
                  )}
                >
                  <ConversationAvatar conversation={conversation} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={cn("truncate text-sm", isUnread ? "font-bold" : "font-medium")}>{name}</span>
                      {lastMessage && (
                        <RelativeTime date={lastMessage.sentAt} className="shrink-0 text-[11px] text-muted-foreground" />
                      )}
                    </span>
                    {conversation.label && (
                      <span className="mt-0.5 inline-block rounded-full bg-primary/15 px-2 py-px text-[10px] font-semibold text-primary">
                        {conversation.label}
                      </span>
                    )}
                    <span className="flex items-center justify-between gap-2">
                      <span className={cn("line-clamp-1 text-xs", isUnread ? "text-foreground" : "text-muted-foreground")}>
                        {lastMessage?.senderId === currentUser.id && "You: "}
                        {lastMessage && getMessagePreview(lastMessage)}
                      </span>
                      {isUnread && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {conversation.unreadCount}
                          <span className="sr-only"> unread</span>
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
