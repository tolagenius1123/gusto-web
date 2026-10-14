import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getConversationName } from "@/features/messaging/conversation-utils";
import { MessagingShell } from "@/features/messaging/components/messaging-shell";
import { MessagingSkeleton } from "@/features/messaging/components/messaging-skeleton";
import { ThreadView } from "@/features/messaging/components/thread-view";
import { getConversationById, getConversations } from "@/lib/data/messaging";

export async function generateMetadata({ params }: PageProps<"/messaging/[conversationId]">): Promise<Metadata> {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  return { title: conversation ? getConversationName(conversation) : "Conversation not found" };
}

export default function ConversationPage({ params }: PageProps<"/messaging/[conversationId]">) {
  return (
    <Suspense fallback={<MessagingSkeleton />}>
      {params.then(({ conversationId }) => (
        <Conversation conversationId={conversationId} />
      ))}
    </Suspense>
  );
}

async function Conversation({ conversationId }: { conversationId: string }) {
  const [conversation, conversations] = await Promise.all([
    getConversationById(conversationId),
    getConversations(),
  ]);
  if (!conversation) notFound();

  return (
    <MessagingShell conversations={conversations} activeId={conversation.id}>
      <ThreadView key={conversation.id} conversation={conversation} />
    </MessagingShell>
  );
}
