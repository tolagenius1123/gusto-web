import type { Metadata } from "next";
import { CommunitiesSection } from "@/features/network/components/communities-section";
import { InvitationsCard } from "@/features/network/components/invitations-card";
import { MentorsSection } from "@/features/network/components/mentors-section";
import { NetworkManageCard } from "@/features/network/components/network-manage-card";
import { SuggestionsSection } from "@/features/network/components/suggestions-section";
import {
  getInvitations,
  getMentors,
  getNetworkStats,
  getPeopleSuggestions,
  getSuggestedCommunities,
} from "@/lib/data/network";

export const metadata: Metadata = { title: "My Network" };

export default async function NetworkPage() {
  const [stats, invitations, suggestions, mentors, communities] = await Promise.all([
    getNetworkStats(),
    getInvitations(),
    getPeopleSuggestions(),
    getMentors(),
    getSuggestedCommunities(),
  ]);

  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside aria-label="Manage my network" className="animate-rise md:sticky md:top-24">
        <NetworkManageCard stats={stats} />
      </aside>
      <div className="min-w-0 space-y-10">
        <h1 className="sr-only">My Network</h1>
        <div className="animate-rise" style={{ animationDelay: "70ms" }}>
          <InvitationsCard invitations={invitations} />
        </div>
        <SuggestionsSection suggestions={suggestions} />
        <MentorsSection mentors={mentors} />
        <CommunitiesSection communities={communities} />
      </div>
    </div>
  );
}
