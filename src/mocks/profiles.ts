import type { Profile } from "@/types/profile";
import type { UserSummary } from "@/types/user";
import { currentUser, currentUserCertifications } from "./current-user";
import { mockUsers, networkUsers } from "./users";

const adaeze: Profile = {
  ...currentUser,
  location: "Lagos, Nigeria",
  about:
    "HSE Manager with 11 years across oil and gas, EPC construction and manufacturing. I build safety cultures where people speak up, near misses get reported and every crew goes home safe.\n\nI lead ISO 45001 and ISO 14001 implementations, run incident investigations using ICAM and TapRooT, and coach site supervisors to own safety rather than outsource it to the HSE department.\n\nCurrently focused on contractor safety management and leading indicators that actually predict incidents.",
  openTo: "hiring",
  connectionCount: 842,
  followerCount: 3_120,
  highlights: {
    yearsInHse: 11,
    safeManHours: 4_200_000,
    incidentFreeProjects: 9,
  },
  certifications: currentUserCertifications,
  experience: [
    {
      id: "e_001",
      title: "HSE Manager",
      company: "Northbridge Construction",
      employmentType: "Full-time",
      location: "Lagos, Nigeria",
      startDate: "2022-01-01",
      endDate: null,
      description:
        "Lead a team of 14 HSE officers across 6 active EPC sites. Rolled out a digital permit-to-work system and cut lost time injuries by 62% in two years.",
    },
    {
      id: "e_002",
      title: "Senior HSE Advisor",
      company: "Deltaline Energy",
      employmentType: "Rotation",
      location: "Port Harcourt, Nigeria",
      startDate: "2018-04-01",
      endDate: "2021-12-31",
      description:
        "Offshore and onshore support for drilling and maintenance campaigns. Led 30+ incident investigations and chaired the contractor safety forum.",
    },
    {
      id: "e_003",
      title: "HSE Officer",
      company: "Apex Manufacturing",
      employmentType: "Full-time",
      location: "Ota, Nigeria",
      startDate: "2015-02-01",
      endDate: "2018-03-31",
      description:
        "Managed risk assessments, toolbox talks and machine guarding upgrades for a 400 person plant.",
    },
  ],
  education: [
    {
      id: "ed_001",
      school: "University of Lagos",
      qualification: "MSc",
      field: "Environmental Management",
      startYear: 2013,
      endYear: 2014,
    },
    {
      id: "ed_002",
      school: "Federal University of Technology, Owerri",
      qualification: "BEng",
      field: "Chemical Engineering",
      startYear: 2008,
      endYear: 2013,
    },
  ],
  skills: [
    {
      category: "Safety management",
      skills: [
        { name: "Risk assessment", endorsements: 64 },
        { name: "Incident investigation", endorsements: 51 },
        { name: "Permit to work", endorsements: 38 },
        { name: "Contractor management", endorsements: 29 },
      ],
    },
    {
      category: "Standards and audit",
      skills: [
        { name: "ISO 45001", endorsements: 47 },
        { name: "ISO 14001", endorsements: 22 },
        { name: "HAZOP", endorsements: 18 },
      ],
    },
    {
      category: "Leadership",
      skills: [
        { name: "Safety culture", endorsements: 33 },
        { name: "Training and coaching", endorsements: 26 },
      ],
    },
  ],
};

function createBasicProfile(user: UserSummary, overrides: Partial<Profile> = {}): Profile {
  return {
    ...user,
    location: "Nigeria",
    about: `${user.headline}. Passionate about keeping people safe and sharing what works with the HSE community.`,
    openTo: null,
    connectionCount: 500,
    followerCount: 1_200,
    highlights: { yearsInHse: 6, safeManHours: 1_100_000, incidentFreeProjects: 4 },
    certifications: [],
    experience: [],
    education: [],
    skills: [],
    ...overrides,
  };
}

export const mockProfiles: Profile[] = [
  adaeze,
  createBasicProfile(mockUsers.chinedu, { location: "Port Harcourt, Nigeria" }),
  createBasicProfile(mockUsers.fatima, { location: "Abuja, Nigeria", openTo: "opportunities" }),
  createBasicProfile(mockUsers.david, { location: "Abuja, Nigeria", openTo: "hiring" }),
  createBasicProfile(mockUsers.grace, { location: "Lagos, Nigeria" }),
  createBasicProfile(mockUsers.tunde, { location: "Warri, Nigeria", openTo: "opportunities" }),
  ...Object.values(networkUsers).map((user) => createBasicProfile(user)),
];

export const recommendedTraining = [
  { id: "t_001", title: "First Aid at Work Requalification", provider: "Gusto Academy", duration: "2 days", reason: "Your First Aid certificate expires soon" },
  { id: "t_002", title: "NEBOSH Process Safety Management", provider: "Gusto Academy", duration: "5 days", reason: "Popular with HSE Managers" },
];
