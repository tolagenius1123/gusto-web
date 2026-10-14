"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifyComingSoon } from "@/lib/notify";

export function SectionEditButton({ sectionTitle }: { sectionTitle: string }) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="rounded-full"
      aria-label={`Edit ${sectionTitle}`}
      onClick={() => notifyComingSoon("Editing your profile")}
    >
      <PencilIcon aria-hidden="true" />
    </Button>
  );
}
