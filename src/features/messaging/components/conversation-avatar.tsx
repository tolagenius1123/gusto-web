import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/messaging";
import { PresenceDot } from "./presence-dot";

export function ConversationAvatar({ conversation, className }: { conversation: Conversation; className?: string }) {
  const [first, second] = conversation.participants;

  if (conversation.kind === "group" && second) {
    return (
      <span aria-hidden="true" className={cn("relative block size-12 shrink-0", className)}>
        <UserAvatar user={first.user} className="absolute top-0 left-0 size-8 ring-2 ring-card" />
        <UserAvatar user={second.user} className="absolute right-0 bottom-0 size-8 ring-2 ring-card" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className={cn("relative block size-12 shrink-0", className)}>
      <UserAvatar user={first.user} className="size-12" />
      <PresenceDot status={first.presence} />
    </span>
  );
}
