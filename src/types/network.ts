import type { Industry } from "./industry";
import type { UserSummary } from "./user";

export type { Industry };

export interface Invitation {
  id: string;
  from: UserSummary;
  sentAt: string;
  mutualConnections: number;
  message: string | null;
}

export interface PersonSuggestion {
  user: UserSummary;
  industry: Industry;
  mutualConnections: number;
  reason: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  industry: Industry;
}

export interface Mentor {
  user: UserSummary;
  industry: Industry;
  yearsExperience: number;
  specialties: string[];
}

export interface NetworkStats {
  connections: number;
  following: number;
  communities: number;
  events: number;
  companies: number;
}
