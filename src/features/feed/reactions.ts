import {
  HeartHandshakeIcon,
  LightbulbIcon,
  PartyPopperIcon,
  ThumbsUpIcon,
  type LucideIcon,
} from "lucide-react";
import type { ReactionType } from "@/types/post";

interface ReactionConfig {
  label: string;
  icon: LucideIcon;
  badgeClassName: string;
  activeTextClassName: string;
}

export const reactionConfig: Record<ReactionType, ReactionConfig> = {
  like: {
    label: "Like",
    icon: ThumbsUpIcon,
    badgeClassName: "bg-primary text-primary-foreground",
    activeTextClassName: "text-primary",
  },
  celebrate: {
    label: "Celebrate",
    icon: PartyPopperIcon,
    badgeClassName: "bg-success text-success-foreground",
    activeTextClassName: "text-success",
  },
  support: {
    label: "Support",
    icon: HeartHandshakeIcon,
    badgeClassName: "bg-rose-600 text-white",
    activeTextClassName: "text-rose-600 dark:text-rose-400",
  },
  insightful: {
    label: "Insightful",
    icon: LightbulbIcon,
    badgeClassName: "bg-amber-400 text-amber-950",
    activeTextClassName: "text-amber-700 dark:text-amber-400",
  },
};

export function getTopReactions(counts: Partial<Record<ReactionType, number>>, limit = 3) {
  return (Object.entries(counts) as [ReactionType, number][])
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([type]) => type);
}

export function getTotalReactions(counts: Partial<Record<ReactionType, number>>) {
  return Object.values(counts).reduce((total, count) => total + (count ?? 0), 0);
}
