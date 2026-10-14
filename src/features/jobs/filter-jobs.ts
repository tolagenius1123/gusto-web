import { getCertificationMatch } from "@/lib/certifications";
import type { Industry } from "@/types/industry";
import type { ExperienceLevel, Job, SiteType, WorkplaceType } from "@/types/job";

export type RotationFilter = "any" | "rotational" | "fixed";
export type JobSort = "relevant" | "newest";

export interface JobFilters {
  keyword: string;
  location: string;
  qualifiedOnly: boolean;
  siteTypes: SiteType[];
  industries: Industry[];
  rotation: RotationFilter;
  experience: ExperienceLevel[];
  workplaces: WorkplaceType[];
}

export const defaultJobFilters: JobFilters = {
  keyword: "",
  location: "",
  qualifiedOnly: false,
  siteTypes: [],
  industries: [],
  rotation: "any",
  experience: [],
  workplaces: [],
};

function includesText(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function matchesAny<T>(selected: T[], value: T) {
  return selected.length === 0 || selected.includes(value);
}

export function countActiveFilters(filters: JobFilters) {
  return (
    Number(filters.qualifiedOnly) +
    filters.siteTypes.length +
    filters.industries.length +
    Number(filters.rotation !== "any") +
    filters.experience.length +
    filters.workplaces.length
  );
}

export function filterAndSortJobs(jobs: Job[], filters: JobFilters, sort: JobSort, heldCertifications: string[]) {
  const filtered = jobs.filter((job) => {
    const match = getCertificationMatch(job.requiredCertifications, heldCertifications);
    return (
      (!filters.keyword || includesText(`${job.title} ${job.company.name}`, filters.keyword)) &&
      (!filters.location || includesText(job.location, filters.location)) &&
      (!filters.qualifiedOnly || match.isQualified) &&
      matchesAny(filters.siteTypes, job.siteType) &&
      matchesAny(filters.industries, job.company.industry) &&
      (filters.rotation === "any" || job.isRotational === (filters.rotation === "rotational")) &&
      matchesAny(filters.experience, job.experienceLevel) &&
      matchesAny(filters.workplaces, job.workplace)
    );
  });

  const byNewest = (a: Job, b: Job) => b.postedAt.localeCompare(a.postedAt);
  if (sort === "newest") return filtered.toSorted(byNewest);

  const relevance = (job: Job) => {
    const match = getCertificationMatch(job.requiredCertifications, heldCertifications);
    return (match.isQualified ? 2 : 0) + (job.isUrgent ? 1 : 0);
  };
  return filtered.toSorted((a, b) => relevance(b) - relevance(a) || byNewest(a, b));
}
