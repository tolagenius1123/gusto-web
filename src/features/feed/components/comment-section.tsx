"use client";

import { useState } from "react";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UserIdentity } from "@/components/shared/user-identity";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { notifyComingSoon } from "@/lib/notify";
import { currentUser } from "@/mocks/current-user";
import type { PostComment } from "@/types/post";

interface CommentSectionProps {
  id: string;
  postId: string;
  comments: PostComment[];
  totalCount: number;
}

export function CommentSection({ id, postId, comments, totalCount }: CommentSectionProps) {
  const [draft, setDraft] = useState("");
  const inputId = `comment-input-${postId}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    notifyComingSoon("Commenting");
  }

  return (
    <section id={id} aria-label="Comments" className="space-y-4 px-(--card-spacing) pt-2">
      <form onSubmit={handleSubmit} className="flex items-start gap-2">
        <UserAvatar user={currentUser} className="size-8" />
        <div className="flex-1 space-y-2">
          <label htmlFor={inputId} className="sr-only">
            Add a comment
          </label>
          <Textarea
            id={inputId}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a comment..."
            maxLength={1250}
            rows={1}
            className="min-h-9 rounded-2xl"
          />
          {draft.trim() && (
            <Button type="submit" size="sm" className="rounded-full">
              Comment
            </Button>
          )}
        </div>
      </form>

      {comments.length > 0 && (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="flex flex-col gap-1.5">
              <div className="rounded-xl bg-muted/70 p-3">
                <UserIdentity
                  user={comment.author}
                  size="sm"
                  meta={<RelativeTime date={comment.createdAt} />}
                />
                <p className="mt-2 text-sm whitespace-pre-line">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalCount > comments.length && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => notifyComingSoon("Loading more comments")}
          className="text-muted-foreground"
        >
          Load more comments
        </Button>
      )}
    </section>
  );
}
