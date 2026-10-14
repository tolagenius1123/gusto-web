import { GraduationCapIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function CourseNotFound() {
  return (
    <PagePlaceholder
      icon={GraduationCapIcon}
      title="Course not found"
      description="This course may have been retired or renamed."
      isWorkInProgress={false}
    />
  );
}
