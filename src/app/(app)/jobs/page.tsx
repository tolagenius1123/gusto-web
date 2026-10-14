import type { Metadata } from "next";
import { JobsBrowser } from "@/features/jobs/components/jobs-browser";
import { getJobs } from "@/lib/data/jobs";
import { currentUserCertifications } from "@/mocks/current-user";

export const metadata: Metadata = { title: "Jobs" };

export default async function JobsPage() {
  const jobs = await getJobs();
  const heldCertifications = currentUserCertifications.map((certification) => certification.shortName);

  return <JobsBrowser jobs={jobs} heldCertifications={heldCertifications} />;
}
