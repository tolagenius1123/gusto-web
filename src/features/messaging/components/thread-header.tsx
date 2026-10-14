"use client";

import { ArrowLeftIcon, EllipsisVerticalIcon, HardHatIcon } from "lucide-react";
import Link from "next/link";
import { getProfileHref } from "@/components/shared/user-identity";
import { Button } from "@/components/ui/button";
import { notifyComingSoon } from "@/lib/notify";
import type { Conversation } from "@/types/messaging";
import { getConversationName } from "../conversation-utils";
import { ConversationAvatar } from "./conversation-avatar";
import { presenceLabels } from "./presence-dot";

export function ThreadHeader({ conversation }: { conversation: Conversation }) {
  const name = getConversationName(conversation);
  const [firstParticipant] = conversation.participants;
  const isGroup = conversation.kind === "group";

  return (
    <header className="flex items-center gap-3 border-b p-3">
      <Link
        href="/messaging"
        aria-label="Back to conversations"
        className="flex size-9 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-5" />
      </Link>
      <ConversationAvatar conversation={conversation} className="size-10 [&>[data-slot=avatar]]:size-10" />
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-semibold">
          {isGroup ? (
            name
          ) : (
            <Link href={getProfileHref(firstParticipant.user)} className="rounded-sm outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
              {name}
            </Link>
          )}
        </h2>
        <p className="truncate text-xs text-muted-foreground">
          {isGroup ? (
            `${conversation.participants.length + 1} members: ${conversation.participants.map((participant) => participant.user.firstName).join(", ")} and you`
          ) : firstParticipant.statusNote ? (
            <span className="inline-flex items-center gap-1 text-caution">
              <HardHatIcon aria-hidden="true" className="size-3.5" />
              {firstParticipant.statusNote}
            </span>
          ) : (
            presenceLabels[firstParticipant.presence]
          )}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Conversation options"
        onClick={() => notifyComingSoon("Conversation options")}
      >
        <EllipsisVerticalIcon aria-hidden="true" />
      </Button>
    </header>
  );
}
