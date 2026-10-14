import type { Community, Invitation, Mentor, NetworkStats, PersonSuggestion } from "@/types/network";
import { mockUsers, networkUsers } from "./users";

export const mockNetworkStats: NetworkStats = {
  connections: 842,
  following: 126,
  communities: 7,
  events: 3,
  companies: 18,
};

export const mockInvitations: Invitation[] = [
  {
    id: "inv_001",
    from: networkUsers.ngozi,
    sentAt: "2026-10-13T16:20:00Z",
    mutualConnections: 14,
    message: "Hi Adaeze, I enjoyed your talk on contractor safety at the Lagos HSE summit. Would love to connect.",
  },
  {
    id: "inv_002",
    from: networkUsers.zainab,
    sentAt: "2026-10-12T09:05:00Z",
    mutualConnections: 3,
    message: null,
  },
  {
    id: "inv_003",
    from: networkUsers.emeka,
    sentAt: "2026-10-10T11:45:00Z",
    mutualConnections: 22,
    message: null,
  },
];

export const mockSuggestions: PersonSuggestion[] = [
  { user: networkUsers.ibrahim, industry: "construction", mutualConnections: 18, reason: "You both hold NEBOSH IGC" },
  { user: networkUsers.kwame, industry: "mining", mutualConnections: 6, reason: "Works in mine safety" },
  { user: networkUsers.amara, industry: "environmental", mutualConnections: 11, reason: "You both follow ISO 14001 Practitioners" },
  { user: networkUsers.samuel, industry: "manufacturing", mutualConnections: 9, reason: "Worked at Apex Manufacturing" },
  { user: networkUsers.halima, industry: "construction", mutualConnections: 4, reason: "Based in Lagos" },
  { user: mockUsers.tunde, industry: "oil_gas", mutualConnections: 27, reason: "Worked at Deltaline Energy" },
  { user: networkUsers.folake, industry: "environmental", mutualConnections: 8, reason: "Popular in Environmental" },
  { user: mockUsers.grace, industry: "environmental", mutualConnections: 15, reason: "You both hold ISO 45001 Lead Auditor" },
];

export const mockCommunities: Community[] = [
  {
    id: "g_001",
    name: "Process Safety Network",
    description: "Engineers and HSE pros sharing lessons on PSM, HAZOP and barrier management.",
    memberCount: 12_480,
    industry: "oil_gas",
  },
  {
    id: "g_002",
    name: "Women in HSE Africa",
    description: "Mentorship, jobs and support for women building HSE careers across Africa.",
    memberCount: 8_215,
    industry: "construction",
  },
  {
    id: "g_003",
    name: "Construction Safety Leaders",
    description: "Site managers and safety leads talking scaffolding, lifting and contractor control.",
    memberCount: 5_903,
    industry: "construction",
  },
];

export const mockMentors: Mentor[] = [
  {
    user: networkUsers.peter,
    industry: "oil_gas",
    yearsExperience: 25,
    specialties: ["Leadership", "Process safety", "Career growth"],
  },
  {
    user: networkUsers.folake,
    industry: "environmental",
    yearsExperience: 16,
    specialties: ["ISO 14001", "ESG reporting", "EIA"],
  },
  {
    user: mockUsers.david,
    industry: "construction",
    yearsExperience: 14,
    specialties: ["Construction safety", "NEBOSH prep", "Team building"],
  },
];
