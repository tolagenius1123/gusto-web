import { mockJobs } from "@/mocks/jobs";
import type { Job } from "@/types/job";

export async function getJobs(): Promise<Job[]> {
  return mockJobs;
}

export async function getJobById(id: string): Promise<Job | null> {
  return mockJobs.find((job) => job.id === id) ?? null;
}

export async function getSimilarJobs(job: Job, limit = 3): Promise<Job[]> {
  return mockJobs
    .filter((candidate) => candidate.id !== job.id)
    .sort((a, b) => Number(b.siteType === job.siteType) - Number(a.siteType === job.siteType))
    .slice(0, limit);
}
