import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/messaging";
import { ConversationList } from "./conversation-list";

interface MessagingShellProps {
  conversations: Conversation[];
  activeId: string | null;
  children: React.ReactNode;
}

export function MessagingShell({ conversations, activeId, children }: MessagingShellProps) {
  return (
    <Card className="grid h-[calc(100dvh-12.5rem)] min-h-[26rem] animate-rise grid-cols-1 gap-0 overflow-hidden rounded-2xl py-0 md:h-[calc(100dvh-9rem)] lg:grid-cols-[22rem_minmax(0,1fr)]">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        className={cn("lg:border-r", activeId && "max-lg:hidden")}
      />
      <div className={cn("min-h-0 min-w-0", !activeId && "max-lg:hidden")}>{children}</div>
    </Card>
  );
}
