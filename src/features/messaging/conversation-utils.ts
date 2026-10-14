import { getFullName } from "@/lib/format";
import type { Conversation, Message, MessageAttachment } from "@/types/messaging";

export function getConversationName(conversation: Conversation) {
  return conversation.title ?? getFullName(conversation.participants[0].user);
}

export function getConversationHref(conversation: Pick<Conversation, "id">) {
  return `/messaging/${conversation.id}`;
}

const attachmentPreviews: Record<MessageAttachment["kind"], string> = {
  document: "Shared a document",
  job: "Shared a job",
  safety_alert: "Shared a safety alert",
};

export function getMessagePreview(message: Message) {
  return message.content || (message.attachment ? attachmentPreviews[message.attachment.kind] : "");
}

export function findSender(conversation: Conversation, senderId: string) {
  return conversation.participants.find((participant) => participant.user.id === senderId)?.user ?? null;
}
