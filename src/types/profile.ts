import type { Certification } from "./certification";
import type { UserSummary } from "./user";

export type OpenToStatus = "opportunities" | "hiring";

export type EmploymentType = "Full-time" | "Contract" | "Part-time" | "Rotation";

export interface Experience {
  id: string;
  title: string;
  company: string;
  employmentType: EmploymentType;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  qualification: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface Skill {
  name: string;
  endorsements: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface SafetyHighlights {
  yearsInHse: number;
  safeManHours: number;
  incidentFreeProjects: number;
}

export interface Profile extends UserSummary {
  location: string;
  about: string;
  openTo: OpenToStatus | null;
  connectionCount: number;
  followerCount: number;
  highlights: SafetyHighlights;
  certifications: Certification[];
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
}
