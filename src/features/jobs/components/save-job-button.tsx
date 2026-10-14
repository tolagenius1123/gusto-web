"use client";

import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveJobButtonProps {
  jobTitle: string;
  variant?: "icon" | "full";
  className?: string;
}

export function SaveJobButton({ jobTitle, variant = "icon", className }: SaveJobButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const Icon = isSaved ? BookmarkCheckIcon : BookmarkIcon;

  function toggle() {
    setIsSaved((saved) => !saved);
    toast(isSaved ? "Removed from saved jobs" : "Job saved");
  }

  return (
    <Button
      variant={variant === "icon" ? "ghost" : "outline"}
      size={variant === "icon" ? "icon" : "default"}
      aria-pressed={isSaved}
      aria-label={variant === "icon" ? `${isSaved ? "Unsave" : "Save"} ${jobTitle}` : undefined}
      onClick={toggle}
      className={cn("rounded-full", isSaved && "text-primary", className)}
    >
      <Icon key={String(isSaved)} aria-hidden="true" className={cn(isSaved && "animate-pop fill-current/20")} />
      {variant === "full" && (isSaved ? "Saved" : "Save")}
    </Button>
  );
}
