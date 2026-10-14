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
  {
    id: "c_001",
    name: "NEBOSH International General Certificate",
    issuer: "NEBOSH",
    issuedAt: "2017-06-15",
    expiresAt: null,
    credentialId: "00412-IGC-2017",
    isVerified: true,
  },
  {
    id: "c_002",
    name: "ISO 45001 Lead Auditor",
    issuer: "IRCA",
    issuedAt: "2022-03-31",
    expiresAt: "2027-03-31",
    credentialId: "IRCA-45001-88213",
    isVerified: true,
  },
  {
    id: "c_003",
    name: "First Aid at Work",
    issuer: "St John Ambulance",
    issuedAt: "2023-11-20",
    expiresAt: "2026-11-20",
    credentialId: null,
    isVerified: false,
  },
  {
    id: "c_004",
    name: "IOSH Managing Safely",
    issuer: "IOSH",
    issuedAt: "2016-02-10",
    expiresAt: null,
    credentialId: "IOSH-MS-55120",
    isVerified: true,
  },
];

export const unreadCounts: Partial<Record<NavItemId, number>> = {
  messaging: 2,
  notifications: 5,
};
