import { mockProfiles } from "@/mocks/profiles";
import type { Profile } from "@/types/profile";
import type { UserSummary } from "@/types/user";

export async function getProfileByUsername(username: string): Promise<Profile | null> {
  return mockProfiles.find((profile) => profile.username === username) ?? null;
}

export async function getSuggestedProfiles(excludeId: string, limit = 4): Promise<UserSummary[]> {
  return mockProfiles.filter((profile) => profile.id !== excludeId).slice(0, limit);
}
