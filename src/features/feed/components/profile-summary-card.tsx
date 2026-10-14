import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { CertificationExpiry } from "@/components/shared/certification-expiry";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getProfileHref } from "@/components/shared/user-identity";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card } from "@/components/ui/card";
import { formatCompactNumber, getFullName } from "@/lib/format";
import type { Certification } from "@/types/certification";
import type { UserSummary } from "@/types/user";

interface ProfileSummaryCardProps {
  user: UserSummary;
  location: string;
  stats: { label: string; value: number }[];
  certifications: Certification[];
}

export function ProfileSummaryCard({ user, location, stats, certifications }: ProfileSummaryCardProps) {
  return (
    <Card className="group/profile gap-0 rounded-2xl pt-0 pb-2">
      <div aria-hidden="true" className="hivis-vest relative h-16 overflow-hidden">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover/profile:animate-glint group-hover/profile:opacity-100" />
      </div>
      <div className="-mt-9 px-(--card-spacing) pb-4">
        <Link
          href={getProfileHref(user)}
          className="group block w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <UserAvatar
            user={user}
            className="size-18 ring-4 ring-card [&_[data-slot=avatar-fallback]]:font-heading [&_[data-slot=avatar-fallback]]:text-2xl"
          />
          <p className="mt-2 font-heading text-lg font-bold tracking-wide group-hover:text-primary">
            {getFullName(user)}
          </p>
        </Link>
        <p className="mt-0.5 text-xs leading-relaxed">{user.headline}</p>
        <p className="mt-1 text-xs text-muted-foreground">{location}</p>
      </div>
      <dl className="grid grid-cols-2 border-y">
        {stats.map((stat) => (
          <div key={stat.label} className="px-(--card-spacing) py-3 not-first:border-l">
            <dd className="font-heading text-xl font-bold text-primary">{formatCompactNumber(stat.value)}</dd>
            <dt className="text-[11px] leading-tight text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
      <section aria-labelledby="my-certifications" className="px-(--card-spacing) pt-4 pb-2">
        <WidgetTitle id="my-certifications" icon={ShieldCheckIcon} iconClassName="text-success">
          Certifications
        </WidgetTitle>
        <ul className="mt-3 space-y-2.5">
          {certifications.map((certification) => (
            <li key={certification.id} className="rounded-lg border bg-muted/40 px-3 py-2 text-xs">
              <p className="font-semibold">{certification.name}</p>
              <p className="text-muted-foreground">{certification.issuer}</p>
              <CertificationExpiry expiresAt={certification.expiresAt} className="mt-1" />
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
