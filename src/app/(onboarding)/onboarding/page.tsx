import type { Metadata } from "next";
import { OnboardingWizard } from "@/features/onboarding/components/onboarding-wizard";
import { currentUser } from "@/mocks/current-user";

export const metadata: Metadata = { title: "Set up your profile" };

export default function OnboardingPage() {
  return <OnboardingWizard firstName={currentUser.firstName} />;
}
