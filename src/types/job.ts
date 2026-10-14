import type { Industry } from "./industry";

export type SiteType = "onshore" | "offshore" | "plant" | "construction_site" | "mine";

export type WorkplaceType = "on_site" | "hybrid" | "remote";

export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";

export interface Company {
  id: string;
  name: string;
  industry: Industry;
  size: string;
  about: string;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: "NGN" | "USD";
  period: "month" | "year";
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  workplace: WorkplaceType;
  siteType: SiteType;
  rotation: string;
  isRotational: boolean;
  experienceLevel: ExperienceLevel;
  salary: SalaryRange | null;
  requiredCertifications: string[];
  postedAt: string;
  applicantCount: number;
  isUrgent: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}
