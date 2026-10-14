import { MessageSquareTextIcon } from "lucide-react";
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Messaging" };

export default function Page() {
  return (
    <PagePlaceholder
      icon={MessageSquareTextIcon}
      title="Messaging"
      description="Your conversations will appear here."
    />
  );
}
