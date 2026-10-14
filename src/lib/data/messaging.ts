import { mockConversations } from "@/mocks/conversations";
import type { Conversation } from "@/types/messaging";

function lastMessageTime(conversation: Conversation) {
  return conversation.messages.at(-1)?.sentAt ?? "";
}

export async function getConversations(): Promise<Conversation[]> {
  return mockConversations.toSorted((a, b) => lastMessageTime(b).localeCompare(lastMessageTime(a)));
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  return mockConversations.find((conversation) => conversation.id === id) ?? null;
}
