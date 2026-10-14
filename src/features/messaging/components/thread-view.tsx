"use client";

import { CheckCheckIcon, CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { currentUser } from "@/mocks/current-user";
import type { Conversation, Message } from "@/types/messaging";
import { findSender } from "../conversation-utils";
import { MessageAttachmentCard } from "./message-attachment-card";
import { MessageComposer } from "./message-composer";
import { ThreadHeader } from "./thread-header";

const timeFormatter = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });

type ThreadMessage = Message & { isLocal?: boolean };

export function ThreadView({ conversation }: { conversation: Conversation }) {
  const [messages, setMessages] = useState<ThreadMessage[]>(conversation.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isGroup = conversation.kind === "group";
  const lastOwnMessageId = messages.findLast((message) => message.senderId === currentUser.id)?.id;

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages.length]);

  function handleSend(content: string) {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        senderId: currentUser.id,
        content,
        sentAt: new Date().toISOString(),
        attachment: null,
        isLocal: true,
      },
    ]);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ThreadHeader conversation={conversation} />
      <div ref={scrollRef} role="log" aria-label="Messages" aria-live="polite" className="min-h-0 flex-1 space-y-1 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const previous = messages[index - 1];
          const isMine = message.senderId === currentUser.id;
          const sender = isMine ? currentUser : findSender(conversation, message.senderId);
          const day = formatShortDate(message.sentAt);
          const startsNewDay = !previous || formatShortDate(previous.sentAt) !== day;
          const startsNewRun = startsNewDay || previous.senderId !== message.senderId;

          return (
            <div key={message.id}>
              {startsNewDay && (
                <p className="my-4 flex items-center gap-3 text-[11px] font-medium tracking-wider text-muted-foreground uppercase before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                  {day}
                </p>
              )}
              <div className={cn("flex gap-2", isMine ? "justify-end" : "justify-start", startsNewRun && "mt-3")}>
                {!isMine && (
                  <span className="w-8 shrink-0">
                    {startsNewRun && sender && <UserAvatar user={sender} className="size-8" />}
                  </span>
                )}
                <div className={cn("flex max-w-[80%] flex-col gap-1.5", isMine ? "items-end" : "items-start")}>
                  {!isMine && isGroup && startsNewRun && sender && (
                    <span className="px-1 text-xs font-semibold text-primary">{sender.firstName}</span>
                  )}
                  {message.content && (
                    <p
                      className={cn(
                        "animate-rise rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-line",
                        isMine ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted",
                      )}
                      style={{ animationDuration: "0.3s" }}
                    >
                      {message.content}
                    </p>
                  )}
                  {message.attachment && <MessageAttachmentCard attachment={message.attachment} />}
                  <span className="flex items-center gap-1 px-1 text-[10px] text-muted-foreground">
                    <time dateTime={message.sentAt}>{timeFormatter.format(new Date(message.sentAt))}</time>
                    {isMine && message.id === lastOwnMessageId && (
                      <>
                        {message.isLocal ? (
                          <CheckIcon aria-hidden="true" className="size-3" />
                        ) : (
                          <CheckCheckIcon aria-hidden="true" className="size-3 text-primary" />
                        )}
                        {message.isLocal ? "Sent" : "Seen"}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MessageComposer onSend={handleSend} />
    </div>
  );
}
