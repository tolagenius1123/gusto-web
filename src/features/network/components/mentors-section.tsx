"use client";

import { CheckIcon, GraduationCapIcon, HandshakeIcon } from "lucide-react";
import { toast } from "sonner";
import { useIdSet } from "@/hooks/use-id-set";
import { getFullName } from "@/lib/format";
import type { Mentor } from "@/types/network";
import { NetworkSection } from "./network-section";
import { PersonCard } from "./person-card";
import { ToggleActionButton } from "./toggle-action-button";

export function MentorsSection({ mentors }: { mentors: Mentor[] }) {
  const requested = useIdSet();

  function toggleRequest(mentor: Mentor) {
    const wasRequested = requested.has(mentor.user.id);
    requested.toggle(mentor.user.id);
    toast(wasRequested ? "Mentorship request withdrawn" : `Mentorship request sent to ${mentor.user.firstName}`);
  }

  return (
    <NetworkSection
      id="mentors"
      title="Find a mentor"
      description="Experienced HSE leaders who offer guidance on careers, exams and leadership"
      icon={GraduationCapIcon}
      iconClassName="text-caution"
    >
      <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
        {mentors.map((mentor) => (
          <li key={mentor.user.id}>
            <PersonCard
              user={mentor.user}
              industry={mentor.industry}
              details={
                <div className="space-y-2">
                  <p className="font-heading text-sm font-bold text-caution">
                    {mentor.yearsExperience} years in HSE
                  </p>
                  <ul className="flex flex-wrap justify-center gap-1.5" aria-label="Specialties">
                    {mentor.specialties.map((specialty) => (
                      <li key={specialty} className="rounded-full border bg-muted/50 px-2 py-0.5 text-[11px]">
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              footer={
                <ToggleActionButton
                  isActive={requested.has(mentor.user.id)}
                  idleLabel="Request mentorship"
                  activeLabel="Requested"
                  idleIcon={HandshakeIcon}
                  activeIcon={CheckIcon}
                  accessibleName={getFullName(mentor.user)}
                  onToggle={() => toggleRequest(mentor)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </NetworkSection>
  );
}
