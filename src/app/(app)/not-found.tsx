import { ConstructionIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function AppNotFound() {
  return (
    <PagePlaceholder
      icon={ConstructionIcon}
      title="Under construction"
      description="This part of Gusto HSE is still being built. Check back soon."
    />
  );
}
