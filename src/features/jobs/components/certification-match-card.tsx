import { ArrowRightIcon, CircleCheckIcon, CircleXIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { SectionCard } from "@/components/shared/section-card";
import { Progress } from "@/components/ui/progress";
import type { CertificationMatch } from "@/lib/certifications";

export function CertificationMatchCard({ match }: { match: CertificationMatch }) {
  const total = match.held.length + match.missing.length;
  const score = total === 0 ? 100 : Math.round((match.held.length / total) * 100);

  return (
    <SectionCard
      id="certification-match"
      title="Certification match"
      icon={ShieldCheckIcon}
      iconClassName="text-success"
      className={match.isQualified ? "ring-success/30" : "ring-hivis/30"}
    >
      {total === 0 ? (
        <p className="text-sm text-muted-foreground">
          No certifications are required. Great for building experience.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">
              You hold <strong className="font-heading text-lg">{match.held.length}</strong> of {total} required
              certifications
            </p>
            <Progress
              value={score}
              aria-label="Certification match"
              className={
                match.isQualified
                  ? "[&_[data-slot=progress-indicator]]:bg-success [&_[data-slot=progress-track]]:h-2"
                  : "[&_[data-slot=progress-indicator]]:bg-hivis [&_[data-slot=progress-track]]:h-2"
              }
            />
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {match.held.map((name) => (
              <li key={name} className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm">
                <CircleCheckIcon aria-hidden="true" className="size-4 text-success" />
                <span className="sr-only">Held: </span>
                {name}
              </li>
            ))}
            {match.missing.map((name) => (
              <li key={name} className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm">
                <CircleXIcon aria-hidden="true" className="size-4 text-destructive" />
                <span className="sr-only">Missing: </span>
                {name}
              </li>
            ))}
          </ul>
          {match.missing.length > 0 && (
            <Link
              href="/training"
              className="group inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Find training for missing certifications
              <ArrowRightIcon aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}
    </SectionCard>
  );
}
