import type { UserSummary } from "./user";

export type PresenceStatus = "online" | "away" | "offline";

export interface Participant {
  user: UserSummary;
  presence: PresenceStatus;
  statusNote: string | null;
}

export type MessageAttachment =
  | { kind: "document"; name: string; sizeLabel: string }
  | { kind: "job"; jobId: string; title: string; companyName: string }
  | { kind: "safety_alert"; title: string; summary: string };

export interface Message {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
  attachment: MessageAttachment | null;
}

export type ConversationKind = "direct" | "group";

export interface Conversation {
  id: string;
  kind: ConversationKind;
  title: string | null;
  label: string | null;
  participants: Participant[];
  messages: Message[];
  unreadCount: number;
}
