"use client";

import { ArrowRightIcon, CalendarClockIcon } from "lucide-react";
import Link from "next/link";
import { HazardTape } from "@/components/layout/hazard-tape";
import { getExpiryStatus } from "@/components/shared/certification-expiry";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNow } from "@/hooks/use-now";
import { formatMonthYear } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Certification } from "@/types/certification";

interface RenewalCourse {
  id: string;
  title: string;
  certificationShortName: string | null;
}

interface RenewalBannerProps {
  certifications: Certification[];
  courses: RenewalCourse[];
}

export function RenewalBanner({ certifications, courses }: RenewalBannerProps) {
  const now = useNow();

  const renewal = certifications
    .filter((certification) => ["expiring", "expired"].includes(getExpiryStatus(certification.expiresAt, now)))
    .map((certification) => ({
      certification,
      course: courses.find((course) => course.certificationShortName === certification.shortName),
    }))
    .find((item) => item.course);

  if (!renewal?.course || !renewal.certification.expiresAt) return null;

  return (
    <Card className="animate-rise gap-0 overflow-hidden rounded-2xl py-0 ring-hivis/40" role="region" aria-label="Certification renewal">
      <HazardTape animated className="h-1.5" />
      <div className="flex flex-col gap-4 bg-hivis/5 p-4 sm:flex-row sm:items-center">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-hivis text-hivis-foreground animate-beacon">
          <CalendarClockIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="flex-1">
          <p className="font-heading text-lg font-bold tracking-wide uppercase">Renewal due</p>
          <p className="text-sm text-muted-foreground">
            Your <strong className="text-foreground">{renewal.certification.name}</strong> certificate expires{" "}
            {formatMonthYear(renewal.certification.expiresAt)}. Book {renewal.course.title} to stay compliant.
          </p>
        </div>
        <Link
          href={`/training/${renewal.course.id}`}
          className={cn(buttonVariants(), "rounded-full bg-hivis px-4 text-hivis-foreground hover:bg-hivis/90")}
        >
          Book renewal
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
