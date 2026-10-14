import { ArrowLeftIcon, TargetIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChecklistSection } from "@/components/shared/checklist-section";
import { DetailPageSkeleton } from "@/components/shared/detail-page-skeleton";
import { CourseCertificationCard } from "@/features/training/components/course-certification-card";
import { CourseHeaderCard } from "@/features/training/components/course-header-card";
import { CurriculumSection } from "@/features/training/components/curriculum-section";
import { SimilarCoursesCard } from "@/features/training/components/similar-courses-card";
import { getCertificationDemand, getCourseById, getSimilarCourses } from "@/lib/data/training";

export async function generateMetadata({ params }: PageProps<"/training/[courseId]">): Promise<Metadata> {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  if (!course) return { title: "Course not found" };
  return { title: course.title, description: course.summary };
}

export default function CourseDetailPage({ params }: PageProps<"/training/[courseId]">) {
  return (
    <div className="space-y-4">
      <Link
        href="/training"
        className="inline-flex items-center gap-1.5 rounded-full text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        Back to training
      </Link>
      <Suspense fallback={<DetailPageSkeleton label="Loading course" />}>
        {params.then(({ courseId }) => (
          <CourseDetail courseId={courseId} />
        ))}
      </Suspense>
    </div>
  );
}

async function CourseDetail({ courseId }: { courseId: string }) {
  const course = await getCourseById(courseId);
  if (!course) notFound();

  const [similarCourses, demand] = await Promise.all([getSimilarCourses(course), getCertificationDemand()]);
  const jobDemand = course.certificationShortName ? (demand[course.certificationShortName] ?? 0) : 0;

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="min-w-0 space-y-4">
        <div className="animate-rise">
          <CourseHeaderCard course={course} />
        </div>
        <ChecklistSection id="outcomes" title="What you will learn" icon={TargetIcon} items={course.outcomes} />
        <CurriculumSection modules={course.modules} />
      </div>
      <aside aria-label="Certification and related courses" className="space-y-4 lg:sticky lg:top-24">
        <CourseCertificationCard course={course} jobDemand={jobDemand} />
        <SimilarCoursesCard courses={similarCourses} />
      </aside>
    </div>
  );
}
