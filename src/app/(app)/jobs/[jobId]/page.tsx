import { ArrowLeftIcon, FileTextIcon, GiftIcon, ListChecksIcon, ClipboardListIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChecklistSection } from "@/components/shared/checklist-section";
import { DetailPageSkeleton } from "@/components/shared/detail-page-skeleton";
import { SectionCard } from "@/components/shared/section-card";
import { CertificationMatchCard } from "@/features/jobs/components/certification-match-card";
import { CompanyCard } from "@/features/jobs/components/company-card";
import { JobHeaderCard } from "@/features/jobs/components/job-header-card";
import { SimilarJobsCard } from "@/features/jobs/components/similar-jobs-card";
import { getCertificationMatch } from "@/lib/certifications";
import { getJobById, getSimilarJobs } from "@/lib/data/jobs";
import { currentUserCertifications } from "@/mocks/current-user";

const MOCK_APPLICANT_EMAIL = "adaeze.okafor@example.com";

export async function generateMetadata({ params }: PageProps<"/jobs/[jobId]">): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job) return { title: "Job not found" };
  return { title: `${job.title} at ${job.company.name}`, description: job.summary };
}

export default function JobDetailPage({ params }: PageProps<"/jobs/[jobId]">) {
  return (
    <div className="space-y-4">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 rounded-full text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>
      <Suspense fallback={<DetailPageSkeleton label="Loading job" />}>
        {params.then(({ jobId }) => (
          <JobDetail jobId={jobId} />
        ))}
      </Suspense>
    </div>
  );
}

async function JobDetail({ jobId }: { jobId: string }) {
  const job = await getJobById(jobId);
  if (!job) notFound();

  const similarJobs = await getSimilarJobs(job);
  const match = getCertificationMatch(
    job.requiredCertifications,
    currentUserCertifications.map((certification) => certification.shortName),
  );

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="min-w-0 space-y-4">
        <div className="animate-rise">
          <JobHeaderCard job={job} applicantEmail={MOCK_APPLICANT_EMAIL} />
        </div>
        <CertificationMatchCard match={match} />
        <SectionCard id="about-role" title="About the role" icon={FileTextIcon}>
          <p className="text-sm leading-relaxed">{job.summary}</p>
        </SectionCard>
        <ChecklistSection id="responsibilities" title="Responsibilities" icon={ClipboardListIcon} items={job.responsibilities} />
        <ChecklistSection id="requirements" title="Requirements" icon={ListChecksIcon} items={job.requirements} />
        <ChecklistSection id="benefits" title="Benefits" icon={GiftIcon} items={job.benefits} />
      </div>
      <aside aria-label="Company and similar jobs" className="space-y-4 lg:sticky lg:top-24">
        <CompanyCard company={job.company} />
        <SimilarJobsCard jobs={similarJobs} />
      </aside>
    </div>
  );
}
