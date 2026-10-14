import { RelativeTime } from "@/components/shared/relative-time";
import { UserIdentity } from "@/components/shared/user-identity";
import { Card } from "@/components/ui/card";
import { getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post";
import { PostContent } from "./post-content";
import { PostEngagement } from "./post-engagement";
import { PostImages } from "./post-images";
import { PostMenu } from "./post-menu";
import { SafetyAlertBanner } from "./safety-alert-banner";

export function PostCard({ post }: { post: Post }) {
  const isSafetyAlert = post.kind === "safety_alert";
  const authorName = getFullName(post.author);

  return (
    <article aria-labelledby={`post-author-${post.id}`}>
      <Card
        className={cn(
          "gap-3 rounded-2xl pb-1 transition-shadow duration-300 hover:shadow-[0_8px_40px_-12px_var(--glow)] hover:ring-primary/25",
          isSafetyAlert && "ring-hivis/40 hover:ring-hivis/60",
        )}
      >
        {isSafetyAlert && <SafetyAlertBanner />}
        <header className="flex items-start justify-between gap-2 px-(--card-spacing)">
          <UserIdentity user={post.author} meta={<RelativeTime date={post.createdAt} />} />
          <span id={`post-author-${post.id}`} className="sr-only">
            {isSafetyAlert ? "Safety alert" : "Post"} by {authorName}
          </span>
          <PostMenu postId={post.id} authorName={authorName} />
        </header>
        <PostContent content={post.content} />
        <PostImages images={post.images} />
        <PostEngagement post={post} />
      </Card>
    </article>
  );
}
