import { ActivityIcon, TriangleAlertIcon } from "lucide-react";
import { RelativeTime } from "@/components/shared/relative-time";
import { ReactionSummary } from "@/features/feed/components/reaction-summary";
import { pluralize } from "@/lib/format";
import type { Post } from "@/types/post";
import { ProfileSection } from "./profile-section";

interface ActivitySectionProps {
  posts: Post[];
  firstName: string;
  isOwnProfile: boolean;
}

export function ActivitySection({ posts, firstName, isOwnProfile }: ActivitySectionProps) {
  return (
    <ProfileSection id="activity" title="Activity" icon={ActivityIcon}>
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {isOwnProfile ? "You haven't posted yet." : `${firstName} hasn't posted yet.`}
        </p>
      ) : (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id} className="py-3 first:pt-0 last:pb-0">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                {post.kind === "safety_alert" && (
                  <span className="inline-flex items-center gap-1 font-semibold text-caution">
                    <TriangleAlertIcon aria-hidden="true" className="size-3" />
                    Safety alert
                  </span>
                )}
                <span>Posted</span>
                <RelativeTime date={post.createdAt} />
              </p>
              <p className="mt-1 line-clamp-2 text-sm">{post.content}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <ReactionSummary counts={post.reactionCounts} />
                {post.commentCount > 0 && <span>{pluralize(post.commentCount, "comment")}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </ProfileSection>
  );
}
