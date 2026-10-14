import { BadgeCheckIcon, MapPinIcon } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card } from "@/components/ui/card";
import { formatCompactNumber, getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OpenToStatus, Profile } from "@/types/profile";
import { ProfileActions } from "./profile-actions";
import { ProfileCover } from "./profile-cover";
import { SafetyHighlights } from "./safety-highlights";

const openToStyles: Record<OpenToStatus, { label: string; ring: string; pill: string }> = {
  opportunities: {
    label: "Open to work",
    ring: "ring-success",
    pill: "bg-success text-success-foreground",
  },
  hiring: {
    label: "Hiring",
    ring: "ring-primary",
    pill: "bg-primary text-primary-foreground",
  },
};

interface ProfileHeroProps {
  profile: Profile;
  isOwnProfile: boolean;
}

export function ProfileHero({ profile, isOwnProfile }: ProfileHeroProps) {
  const openTo = profile.openTo ? openToStyles[profile.openTo] : null;
  const hasVerifiedCredential = profile.certifications.some((certification) => certification.isVerified);

  return (
    <Card className="gap-0 rounded-2xl pt-0">
      <ProfileCover />
      <div className="px-(--card-spacing) sm:px-6">
        <div className="-mt-14 flex flex-wrap items-end justify-between gap-4 sm:-mt-16">
          <div className="relative">
            <UserAvatar
              user={profile}
              className={cn(
                "size-28 ring-4 sm:size-32 [&_[data-slot=avatar-fallback]]:font-heading [&_[data-slot=avatar-fallback]]:text-4xl",
                openTo ? openTo.ring : "ring-card",
              )}
            />
            {openTo && (
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap ring-2 ring-card",
                  openTo.pill,
                )}
              >
                {openTo.label}
              </span>
            )}
          </div>
          <ProfileActions isOwnProfile={isOwnProfile} firstName={profile.firstName} />
        </div>

        <div className="mt-5 space-y-1.5">
          <h1 className="flex items-center gap-2 font-heading text-3xl font-bold tracking-wide">
            {getFullName(profile)}
            {hasVerifiedCredential && (
              <BadgeCheckIcon aria-label="Verified credentials" className="size-6 text-success" />
            )}
          </h1>
          <p className="text-base">{profile.headline}</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPinIcon aria-hidden="true" className="size-3.5" />
              {profile.location}
            </span>
            <span className="font-medium text-primary">
              {formatCompactNumber(profile.connectionCount)} connections
            </span>
            <span>{formatCompactNumber(profile.followerCount)} followers</span>
          </p>
        </div>

        <div className="mt-5">
          <h2 className="sr-only">Safety credentials</h2>
          <SafetyHighlights highlights={profile.highlights} certificationCount={profile.certifications.length} />
        </div>
      </div>
    </Card>
  );
}
