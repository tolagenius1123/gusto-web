import { UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "My Network" };

export default function Page() {
  return (
    <PagePlaceholder
      icon={UsersIcon}
      title="My Network"
      description="Grow your network of HSE professionals."
    />
  );
}
