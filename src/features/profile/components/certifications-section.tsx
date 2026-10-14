import { BadgeCheckIcon, ShieldCheckIcon } from "lucide-react";
import { CertificationExpiry } from "@/components/shared/certification-expiry";
import { formatMonthYear } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Certification } from "@/types/certification";
import { ProfileSection } from "./profile-section";

interface CertificationsSectionProps {
  certifications: Certification[];
  isEditable: boolean;
}

export function CertificationsSection({ certifications, isEditable }: CertificationsSectionProps) {
  return (
    <ProfileSection
      id="certifications"
      title="Certifications"
      icon={ShieldCheckIcon}
      iconClassName="text-success"
      isEditable={isEditable}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((certification) => (
          <li
            key={certification.id}
            className={cn(
              "relative overflow-hidden rounded-xl border bg-muted/30 p-4 transition-colors hover:border-success/40",
              certification.isVerified && "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-success",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold leading-snug">{certification.name}</p>
              {certification.isVerified && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-success uppercase">
                  <BadgeCheckIcon aria-hidden="true" className="size-3" />
                  Verified
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{certification.issuer}</p>
            <p className="mt-2 text-xs text-muted-foreground">Issued {formatMonthYear(certification.issuedAt)}</p>
            <CertificationExpiry expiresAt={certification.expiresAt} className="mt-1 text-xs font-medium" />
            {certification.credentialId && (
              <p className="mt-2 truncate font-mono text-[11px] text-muted-foreground">
                <span className="sr-only">Credential ID: </span>
                {certification.credentialId}
              </p>
            )}
          </li>
        ))}
      </ul>
    </ProfileSection>
  );
}
