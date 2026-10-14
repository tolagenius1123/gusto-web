import type { LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/shared/section-card";
import { SectionEditButton } from "./section-edit-button";

interface ProfileSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconClassName?: string;
  isEditable?: boolean;
  children: React.ReactNode;
}

export function ProfileSection({ isEditable = false, ...props }: ProfileSectionProps) {
  return <SectionCard {...props} action={isEditable ? <SectionEditButton sectionTitle={props.title} /> : undefined} />;
}
