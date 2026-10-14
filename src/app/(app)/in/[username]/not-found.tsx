import { UserRoundXIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function ProfileNotFound() {
  return (
    <PagePlaceholder
      icon={UserRoundXIcon}
      title="Profile not found"
      description="This profile does not exist or is no longer available."
      isWorkInProgress={false}
    />
  );
}
