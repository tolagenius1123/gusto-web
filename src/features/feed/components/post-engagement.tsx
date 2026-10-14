"use client";

import { MessageSquareTextIcon, Repeat2Icon, SendIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { pluralize } from "@/lib/format";
import { notifyComingSoon } from "@/lib/notify";
import { cn } from "@/lib/utils";
import type { Post, ReactionType } from "@/types/post";
import { reactionConfig } from "../reactions";
import { CommentSection } from "./comment-section";
import { ReactionSummary } from "./reaction-summary";

type ReactionCounts = Partial<Record<ReactionType, number>>;

function adjustCount(counts: ReactionCounts, type: ReactionType, delta: number): ReactionCounts {
  return { ...counts, [type]: Math.max(0, (counts[type] ?? 0) + delta) };
}

interface ActionButtonProps extends React.ComponentProps<"button"> {
  icon: LucideIcon;
  label: string;
  iconClassName?: string;
  animationKey?: number;
}

function ActionButton({ icon: Icon, label, iconClassName, animationKey = 0, className, ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      <Icon
        key={animationKey}
        aria-hidden="true"
        className={cn("size-5", animationKey > 0 && "animate-pop", iconClassName)}
      />
      <span className="max-sm:sr-only">{label}</span>
    </button>
  );
}

export function PostEngagement({ post }: { post: Post }) {
  const [viewerReaction, setViewerReaction] = useState(post.viewerReaction);
  const [reactionCounts, setReactionCounts] = useState(post.reactionCounts);
  const [showComments, setShowComments] = useState(false);
  const [reactionAnimationKey, setReactionAnimationKey] = useState(0);
  const commentsId = `comments-${post.id}`;

  const activeReaction = reactionConfig[viewerReaction ?? "like"];

  function toggleReaction() {
    setReactionAnimationKey((key) => key + 1);
    if (viewerReaction) {
      setReactionCounts((counts) => adjustCount(counts, viewerReaction, -1));
      setViewerReaction(null);
      return;
    }
    setReactionCounts((counts) => adjustCount(counts, "like", 1));
    setViewerReaction("like");
  }

  const hasStats = Object.keys(reactionCounts).length > 0 || post.commentCount > 0 || post.repostCount > 0;

  return (
    <div>
      {hasStats && (
        <div className="flex items-center justify-between gap-2 px-(--card-spacing) pb-2 text-xs text-muted-foreground">
          <ReactionSummary counts={reactionCounts} />
          <div className="ml-auto flex gap-2">
            {post.commentCount > 0 && (
              <button
                type="button"
                onClick={() => setShowComments((isOpen) => !isOpen)}
                className="rounded-sm outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {pluralize(post.commentCount, "comment")}
              </button>
            )}
            {post.repostCount > 0 && <span>{pluralize(post.repostCount, "repost")}</span>}
          </div>
        </div>
      )}
      <Separator className="mx-(--card-spacing) w-auto!" />
      <div className="flex px-2 py-1">
        <ActionButton
          icon={activeReaction.icon}
          label={activeReaction.label}
          aria-pressed={viewerReaction !== null}
          onClick={toggleReaction}
          animationKey={reactionAnimationKey}
          className={cn(viewerReaction && activeReaction.activeTextClassName)}
          iconClassName={cn(viewerReaction && "fill-current/25")}
        />
        <ActionButton
          icon={MessageSquareTextIcon}
          label="Comment"
          aria-expanded={showComments}
          aria-controls={commentsId}
          onClick={() => setShowComments((isOpen) => !isOpen)}
        />
        <ActionButton icon={Repeat2Icon} label="Repost" onClick={() => notifyComingSoon("Reposting")} />
        <ActionButton icon={SendIcon} label="Send" onClick={() => notifyComingSoon("Sending posts")} />
      </div>
      {showComments && (
        <CommentSection
          id={commentsId}
          postId={post.id}
          comments={post.comments}
          totalCount={post.commentCount}
        />
      )}
    </div>
  );
}
