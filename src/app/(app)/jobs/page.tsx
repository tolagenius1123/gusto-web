import { BriefcaseBusinessIcon } from "lucide-react";
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Jobs" };

export default function Page() {
  return (
    <PagePlaceholder
      icon={BriefcaseBusinessIcon}
      title="Jobs"
      description="Find HSE roles that match your skills and certifications."
    />
  );
}
