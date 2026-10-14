import { BellIcon } from "lucide-react";
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Notifications" };

export default function Page() {
  return (
    <PagePlaceholder
      icon={BellIcon}
      title="Notifications"
      description="Stay up to date with activity on your network."
    />
  );
}
