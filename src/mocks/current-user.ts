import type { NavItemId } from "@/config/navigation";
import type { Certification } from "@/types/certification";
import type { UserSummary } from "@/types/user";

export const currentUser: UserSummary = {
  id: "u_001",
  username: "adaeze-okafor",
  firstName: "Adaeze",
  lastName: "Okafor",
  headline: "HSE Manager | NEBOSH IGC | ISO 45001 Lead Auditor",
  avatarUrl: null,
};

export const currentUserProfile = {
  location: "Lagos, Nigeria",
  stats: [
    { label: "Profile viewers", value: 128 },
    { label: "Post impressions", value: 2_431 },
  ],
};

export const currentUserCertifications: Certification[] = [
  { id: "c_001", name: "NEBOSH IGC", issuer: "NEBOSH", expiresAt: null },
  { id: "c_002", name: "ISO 45001 Lead Auditor", issuer: "IRCA", expiresAt: "2027-03-31" },
  { id: "c_003", name: "First Aid at Work", issuer: "St John Ambulance", expiresAt: "2026-11-20" },
];

export const unreadCounts: Partial<Record<NavItemId, number>> = {
  messaging: 2,
  notifications: 5,
};
