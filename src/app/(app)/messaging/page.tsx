import type { Metadata } from "next";
import { EmptyThread } from "@/features/messaging/components/empty-thread";
import { MessagingShell } from "@/features/messaging/components/messaging-shell";
import { getConversations } from "@/lib/data/messaging";

export const metadata: Metadata = { title: "Messaging" };

export default async function MessagingPage() {
  const conversations = await getConversations();

  return (
    <MessagingShell conversations={conversations} activeId={null}>
      <EmptyThread />
    </MessagingShell>
  );
}
