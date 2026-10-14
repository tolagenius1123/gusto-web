import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AboutSection } from "@/features/profile/components/about-section";
import { ActivitySection } from "@/features/profile/components/activity-section";
import { CertificationsSection } from "@/features/profile/components/certifications-section";
import { EducationSection } from "@/features/profile/components/education-section";
import { ExperienceSection } from "@/features/profile/components/experience-section";
import { PeopleAlsoViewedCard } from "@/features/profile/components/people-also-viewed-card";
import { ProfileHero } from "@/features/profile/components/profile-hero";
import { ProfileSectionNav } from "@/features/profile/components/profile-section-nav";
import { ProfileSkeleton } from "@/features/profile/components/profile-skeleton";
import { ProfileStrengthCard } from "@/features/profile/components/profile-strength-card";
import { RecommendedTrainingCard } from "@/features/profile/components/recommended-training-card";
import { SkillsSection } from "@/features/profile/components/skills-section";
import { getPostsByAuthor } from "@/lib/data/posts";
import { getProfileByUsername, getSuggestedProfiles } from "@/lib/data/profiles";
import { getFullName } from "@/lib/format";
import { currentUser } from "@/mocks/current-user";
import { recommendedTraining } from "@/mocks/profiles";

export async function generateMetadata({ params }: PageProps<"/in/[username]">): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) return { title: "Profile not found" };
  return { title: getFullName(profile), description: profile.headline };
}

export default function ProfilePage({ params }: PageProps<"/in/[username]">) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      {params.then(({ username }) => (
        <ProfileView username={username} />
      ))}
    </Suspense>
  );
}

async function ProfileView({ username }: { username: string }) {
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const [posts, suggestedPeople] = await Promise.all([
    getPostsByAuthor(profile.id),
    getSuggestedProfiles(profile.id),
  ]);
  const isOwnProfile = profile.id === currentUser.id;

  const sections = [
    { id: "about", label: "About", isVisible: Boolean(profile.about) },
    { id: "certifications", label: "Certifications", isVisible: profile.certifications.length > 0 },
    { id: "experience", label: "Experience", isVisible: profile.experience.length > 0 },
    { id: "skills", label: "Skills", isVisible: profile.skills.length > 0 },
    { id: "education", label: "Education", isVisible: profile.education.length > 0 },
    { id: "activity", label: "Activity", isVisible: true },
  ].filter((section) => section.isVisible);
  const isVisible = (id: string) => sections.some((section) => section.id === id);

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="min-w-0 space-y-4">
        <div className="animate-rise">
          <ProfileHero profile={profile} isOwnProfile={isOwnProfile} />
        </div>
        <ProfileSectionNav sections={sections} />
        {isVisible("about") && <AboutSection about={profile.about} isEditable={isOwnProfile} />}
        {isVisible("certifications") && (
          <CertificationsSection certifications={profile.certifications} isEditable={isOwnProfile} />
        )}
        {isVisible("experience") && <ExperienceSection experience={profile.experience} isEditable={isOwnProfile} />}
        {isVisible("skills") && <SkillsSection skills={profile.skills} isEditable={isOwnProfile} />}
        {isVisible("education") && <EducationSection education={profile.education} isEditable={isOwnProfile} />}
        <ActivitySection posts={posts} firstName={profile.firstName} isOwnProfile={isOwnProfile} />
      </div>

      <aside aria-label="Suggestions" className="space-y-4 lg:sticky lg:top-24">
        {isOwnProfile && (
          <>
            <ProfileStrengthCard score={85} suggestions={["Add a cover photo", "Add 2 more skills"]} />
            <RecommendedTrainingCard courses={recommendedTraining} />
          </>
        )}
        <PeopleAlsoViewedCard people={suggestedPeople} />
      </aside>
    </div>
  );
}
