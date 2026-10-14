import type { Metadata } from "next";
import { ContinueLearningCard } from "@/features/training/components/continue-learning-card";
import { RenewalBanner } from "@/features/training/components/renewal-banner";
import { TrainingBrowser } from "@/features/training/components/training-browser";
import { getCertificationDemand, getCourses, getCurrentEnrollments } from "@/lib/data/training";
import { currentUserCertifications } from "@/mocks/current-user";

export const metadata: Metadata = { title: "Training" };

export default async function TrainingPage() {
  const [courses, enrollments, certificationDemand] = await Promise.all([
    getCourses(),
    getCurrentEnrollments(),
    getCertificationDemand(),
  ]);

  const renewalCourses = courses.map(({ id, title, certificationShortName }) => ({ id, title, certificationShortName }));

  return (
    <TrainingBrowser
      courses={courses}
      certificationDemand={certificationDemand}
      highlights={
        <div className="space-y-4">
          <RenewalBanner certifications={currentUserCertifications} courses={renewalCourses} />
          {enrollments.map((enrollment) => (
            <ContinueLearningCard key={enrollment.course.id} enrollment={enrollment} />
          ))}
        </div>
      }
    />
  );
}
