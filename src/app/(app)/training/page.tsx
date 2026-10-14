import { GraduationCapIcon } from "lucide-react";
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Training" };

export default function Page() {
  return (
    <PagePlaceholder
      icon={GraduationCapIcon}
      title="Training"
      description="Browse HSE courses and certifications."
    />
  );
}
