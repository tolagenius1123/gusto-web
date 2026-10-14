import type { Metadata } from "next";
import { FooterLinks } from "@/components/layout/footer-links";
import { HseNewsCard } from "@/features/feed/components/hse-news-card";
import { PostCard } from "@/features/feed/components/post-card";
import { PostComposer } from "@/features/feed/components/post-composer";
import { ProfileSummaryCard } from "@/features/feed/components/profile-summary-card";
import { SafetyPulseCard } from "@/features/feed/components/safety-pulse-card";
import { ToolboxTalkCard } from "@/features/feed/components/toolbox-talk-card";
import {
  currentUser,
  currentUserCertifications,
  currentUserProfile,
} from "@/mocks/current-user";
import { mockNews, mockPosts } from "@/mocks/feed";
import { safetyPulse, toolboxTalk } from "@/mocks/insights";

export const metadata: Metadata = { title: "Home" };

const STAGGER_MS = 70;

export default function FeedPage() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)_19rem]">
      <aside aria-label="Your profile" className="sticky top-24 hidden animate-rise md:block">
        <ProfileSummaryCard
          user={currentUser}
          location={currentUserProfile.location}
          stats={currentUserProfile.stats}
          certifications={currentUserCertifications}
        />
      </aside>

      <section aria-labelledby="feed-heading" className="min-w-0 space-y-4">
        <h1 id="feed-heading" className="sr-only">
          Home feed
        </h1>
        <div className="animate-rise">
          <PostComposer user={currentUser} />
        </div>
        <ul className="space-y-4">
          {mockPosts.map((post, index) => (
            <li key={post.id} className="animate-rise" style={{ animationDelay: `${(index + 1) * STAGGER_MS}ms` }}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <aside aria-label="Safety insights and news" className="sticky top-24 hidden space-y-4 lg:block">
        <div className="animate-rise" style={{ animationDelay: `${STAGGER_MS}ms` }}>
          <SafetyPulseCard stats={safetyPulse} />
        </div>
        <div className="animate-rise" style={{ animationDelay: `${STAGGER_MS * 2}ms` }}>
          <ToolboxTalkCard talk={toolboxTalk} />
        </div>
        <div className="animate-rise" style={{ animationDelay: `${STAGGER_MS * 3}ms` }}>
          <HseNewsCard items={mockNews} />
        </div>
        <FooterLinks />
      </aside>
    </div>
  );
}
