import {
  mockCommunities,
  mockInvitations,
  mockMentors,
  mockNetworkStats,
  mockSuggestions,
} from "@/mocks/network";
import type { Community, Invitation, Mentor, NetworkStats, PersonSuggestion } from "@/types/network";

export async function getNetworkStats(): Promise<NetworkStats> {
  return mockNetworkStats;
}

export async function getInvitations(): Promise<Invitation[]> {
  return mockInvitations;
}

export async function getPeopleSuggestions(): Promise<PersonSuggestion[]> {
  return mockSuggestions;
}

export async function getSuggestedCommunities(): Promise<Community[]> {
  return mockCommunities;
}

export async function getMentors(): Promise<Mentor[]> {
  return mockMentors;
}
