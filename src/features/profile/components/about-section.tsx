import { UserRoundIcon } from "lucide-react";
import { ExpandableText } from "@/components/shared/expandable-text";
import { ProfileSection } from "./profile-section";

export function AboutSection({ about, isEditable }: { about: string; isEditable: boolean }) {
  return (
    <ProfileSection id="about" title="About" icon={UserRoundIcon} isEditable={isEditable}>
      <ExpandableText text={about} />
    </ProfileSection>
  );
}
