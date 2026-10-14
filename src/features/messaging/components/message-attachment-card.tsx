"use client";

import { ArrowRightIcon, BriefcaseBusinessIcon, DownloadIcon, FileTextIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { HazardTape } from "@/components/layout/hazard-tape";
import { Button } from "@/components/ui/button";
import { notifyComingSoon } from "@/lib/notify";
import type { MessageAttachment } from "@/types/messaging";

const cardClassName = "w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground";

export function MessageAttachmentCard({ attachment }: { attachment: MessageAttachment }) {
  if (attachment.kind === "document") {
    return (
      <div className={`${cardClassName} flex items-center gap-3 p-3`}>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/15">
          <FileTextIcon aria-hidden="true" className="size-5 text-destructive" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{attachment.name}</span>
          <span className="text-xs text-muted-foreground">PDF · {attachment.sizeLabel}</span>
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          aria-label={`Download ${attachment.name}`}
          onClick={() => notifyComingSoon("Downloading files")}
        >
          <DownloadIcon aria-hidden="true" />
        </Button>
      </div>
    );
  }

  if (attachment.kind === "job") {
    return (
      <Link
        href={`/jobs/${attachment.jobId}`}
        className={`${cardClassName} group flex items-center gap-3 p-3 outline-none hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50`}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <BriefcaseBusinessIcon aria-hidden="true" className="size-5 text-primary" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold group-hover:text-primary">{attachment.title}</span>
          <span className="text-xs text-muted-foreground">{attachment.companyName}</span>
        </span>
        <ArrowRightIcon aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <div className={`${cardClassName} border-hivis/40`}>
      <HazardTape animated className="h-1" />
      <div className="space-y-1 p-3">
        <p className="flex items-center gap-1.5 font-heading text-xs font-bold tracking-[0.15em] text-caution uppercase">
          <TriangleAlertIcon aria-hidden="true" className="size-3.5" />
          Safety alert
        </p>
        <p className="text-sm font-semibold">{attachment.title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{attachment.summary}</p>
      </div>
    </div>
  );
}
