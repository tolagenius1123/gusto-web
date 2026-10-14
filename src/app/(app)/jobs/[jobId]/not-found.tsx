import { BriefcaseBusinessIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function JobNotFound() {
  return (
    <PagePlaceholder
      icon={BriefcaseBusinessIcon}
      title="Job not found"
      description="This job may have been filled or removed."
      isWorkInProgress={false}
    />
  );
}
