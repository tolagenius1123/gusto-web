import type { UserSummary } from "./user";

export type ReactionType = "like" | "celebrate" | "support" | "insightful";

export type PostKind = "post" | "safety_alert";

export interface PostImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostComment {
  id: string;
  author: UserSummary;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  kind: PostKind;
  author: UserSummary;
  content: string;
  images: PostImage[];
  createdAt: string;
  reactionCounts: Partial<Record<ReactionType, number>>;
  viewerReaction: ReactionType | null;
  commentCount: number;
  repostCount: number;
  comments: PostComment[];
}
